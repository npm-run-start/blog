# Git

_emmm...还是 sourceTree 香_

## 流程图

![](/git-1.png)

- 工作区（Workspace）：，就是你在电脑里能看到的目录
- 版本库（Repository）：工作区有一个隐藏目录.git，这个不算工作区，而是 Git 的版本库。Git 的版本库里存了很多东西，其中最重要的就是称为 stage（或者叫 index）的暂存区，还有 Git 为我们自动创建的第一个分支 master，以及指向 master 的一个指针叫 HEAD。
- 远程仓库（Remote）：GitHub、Gitee 都是远程仓库

## 思维导图

![](/git-2.png)

## 常用命令

> git 是由 C 语言开发，可以运行在 Linux，macOS，Solaris，Windows，Raspberry Pi 操作系统

### 安装

```ts
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
```

### 初始化 git 仓库

```ts
$ git init
```

### 添加文件到 git 仓库

```ts
$ git add <file>
$ git commit -m <message>
```

### 查看工作区的状态

```ts
$ git status
```

#### 查看修改内容

```ts
$ git diff
```

### 已提交历史版本穿梭

```ts
// 指定版本回退
$ git reset --hard commit_id
// 回退版本，查看历史提交版本
$ git log
// 重返未来, 查看命令历史，确定回到哪个未来版本
$ git reflog
```

### 撤销修改

```ts
// 场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改
$ git checkout -- file
// 场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步
// 第一步
$ git reset HEAD <file>
// 第二步
$ git checkout -- file
```

### 删除文件

```ts
$ git rm file
```

### 远程仓库

```ts
// 第1步：创建SSH Key。在用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有id_rsa和id_rsa.pub这两个文件，如果已经有了，可直接跳到下一步。如果没有，打开Shell（Windows下打开Git Bash），创建SSH Key：
$ ssh-keygen -t rsa -C "youremail@example.com"
// 第2步：登陆GitHub，打开“Account settings”，“SSH Keys”页面：点“Add SSH Key”，填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容
```

### 关联远程库

```ts
$ git remote add origin git@server-name:path/repo-name.git
// 第一次推送master分支的所有内容
$ git push -u origin master
// 此后，每次本地提交后，只要有必要，就可以推送最新修改
$ git push origin master
// 修改remote rep 地址
git remote set-url origin [url]
```

### 从远程库克隆

```ts
$ git clone <仓库地址>
// Git支持多种协议，包括https，但ssh协议速度最快。
```

### 创建与合并分支

```ts
// 查看分支
$ git branch
// 创建分支
$ git branch <name>
// 切换分支
$ git checkout <name>
// 或者
$ git switch <name>
// 创建+切换分支
$ git checkout -b <name>
// 或者
$ git switch -c <name>
// 合并某分支到当前分支
$ git merge <name>
// 删除分支
$ git branch -d <name>
```

### 解决冲突

- 当 Git 无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。
- 解决冲突就是把 Git 合并失败的文件手动编辑为我们希望的内容，再提交。
- 用 git log --graph 命令可以看到分支合并图。

### 分支管理策略

```ts
// 通常，合并分支时，如果可能，Git会用Fast forward模式，但这种模式下，删除分支后，会丢掉分支信息
$ git merge dev
// --no-ff参数，表示禁用Fast forward：因为本次合并要创建一个新的commit，所以加上-m参数，把commit描述写进去
$ git merge --no-ff -m "merge with no-ff" dev
```

### Bug 分支

- 修复 bug 时，我们会通过创建新的 bug 分支进行修复，然后合并，最后删除

```ts
// 当手头工作没有完成时，可以把当前工作现场“储藏”起来，然后去修复bug
$ git stash
// 完成了bug的修复，用命令查看储藏的内容（git status会显示clear）
$ git stash list
// 恢复
// 第一种方式，虽然apply可以恢复，但stash内容并不删除，需要drop删除
$ git stash apply
$ git stash drop
// 第二种方式
$ git stash pop
// 在master分支上修复的bug，想要合并到当前dev分支，可以用命令，把bug提交的修改“复制”到当前分支，避免重复劳动
$ git cherry-pick <commit>
// 可以同时指定提交范围，包含1不包含100
$ git cherry-pick commit1..commit100
```

### Feature 分支

```ts
// 开发一个新feature，最好新建一个分支；
$ git switch -c feature-zhan
// 如果要丢弃一个没有被合并过的分支，可以通过强行删除
$ git branch -D <name>
```

### 多人协作

```ts
// 查看远程库信息
$ git remote -v；
// 本地新建的分支如果不推送到远程，对其他人就是不可见的
// 从本地推送分支
$ git push origin branch-name
// 如果推送失败，先抓取远程的新提交，如果有冲突，要先处理冲突
$ git pull
// 在本地创建和远程分支对应的分支，本地和远程分支的名称最好一致
$ git checkout -b branch-name origin/branch-name
// 建立本地分支和远程分支的关联
$ git branch --set-upstream branch-name origin/branch-name
```

### Rebase

```ts
// 看下提交历史
$ git log --graph --pretty=oneline --abbrev-commit
* d1be385 (HEAD -> master, origin/master) init hello
*   e5e69f1 Merge branch 'dev'
|\
| *   57c53ab (origin/dev, dev) fix env conflict
| |\
| | * 7a5e5dd add env
| * | 7bd91f1 add new env
| |/
* |   12a631b merged bug fix 101
|\ \
| * | 4c805e2 fix bug 101
|/ /
* |   e1e9c68 merge with no-ff
|\ \
| |/
| * f52c633 add merge
|/
*   cf810e4 conflict fixed
// rebase操作可以把本地未push的分叉提交历史整理成直线
$ git rebase
// rebase的目的是使得我们在查看历史提交的变化时更容易，因为分叉的提交需要三方对比
$ git log --graph --pretty=oneline --abbrev-commit
* 7e61ed4 (HEAD -> master) add author
* 3611cfe add comment
* f005ed4 (origin/master) set exit=1
* d1be385 init hello
```

### 创建标签

```ts
// 先切到需要打标签的分支，执行
$ git tag <name>
// 默认为HEAD，也可以指定一个commit id打上标签
$ git log --pretty=oneline --abbrev-commit
12a631b (HEAD -> master, tag: v1.0, origin/master) merged bug fix 101
4c805e2 fix bug 101
e1e9c68 merge with no-ff
f52c633 add merge
cf810e4 conflict fixed
// 指定提交版本
$ git tag v0.9 f52c633
// 还可以创建带有说明的标签，用-a指定标签名，-m指定说明文字
$ git tag -a v0.1 -m "version 0.1 released" 1094adb
// 查看标签
$ git tag
v0.9
v1.0
// 标签不是按时间顺序列出，而是按字母排序的。可以用git show <tagname>查看标签信息
$ git show v0.9
commit f52c63349bc3c1593499807e5c8e972b82c8f286 (tag: v0.9)
Author: Michael Liao <askxuefeng@gmail.com>
Date:   Fri May 18 21:56:54 2018 +0800

    add merge

diff --git a/readme.txt b/readme.txt
```

### 操作标签

```ts
// 可以推送一个本地标签
$ git push origin <tagname>
// 可以推送全部未推送过的本地标签
$ git push origin --tags
// 可以删除一个本地标签
$ git tag -d <tagname>
// 可以删除一个远程标签
$ git push origin :refs/tags/<tagname>
```

### 清除缓存

```ts
$ npm cache clear --force
```
