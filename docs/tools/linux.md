# Linux 命令小记

## touch 命令

```ts
// 创建文件
$ touch demo.js
* a 改变档案的读取时间记录。
* m 改变档案的修改时间记录。
* c 假如目的档案不存在，不会建立新的档案。与 --no-create 的效果一样。
* f 不使用，是为了与其他 unix 系统的相容性而保留。
* r 使用参考档的时间记录，与 --file 的效果一样。
* d 设定时间与日期，可以使用各种不同的格式。
* t 设定档案的时间记录，格式与 date 指令相同。
* --no-create 不会建立新档案。
* --help 列出指令格式。
* --version 列出版本讯息。
```

## mkdir 命令

```ts
// 创建目录
$ mkdir dirName
$ mkdir [-p] dirName
* -p 确保目录名称存在，不存在的就建一个。
```

## rm 命令

```ts
// 删除文件或目录
$ rm -rf node_modules
$ rm package-lock.json
* -i 删除前逐一询问确认。
* -f 即使原档案属性设为唯读，亦直接删除，无需逐一确认。
* -r 将目录及以下之档案亦逐一删除。
```

## ls 命令

```ts
// 用于显示指定工作目录下之内容（列出目前工作目录所含之文件及子目录)
$ ls
* -a 显示所有文件及目录 (. 开头的隐藏文件也会列出)
* -l 除文件名称外，亦将文件型态、权限、拥有者、文件大小等资讯详细列出
* -r 将文件以相反次序显示(原定依英文字母次序)
* -t 将文件依建立时间之先后次序列出
* -A 同 -a ，但不列出 "." (目前目录) 及 ".." (父目录)
* -F 在列出的文件名称后加一符号；例如可执行档则加 "*", 目录则加 "/"
* -R 若目录下有文件，则以下之文件亦皆依序列出
```

## cd 命令

```ts
// 用于切换当前工作目录
$ cd [dirName]
// 跳到指定的文件
$ cd /usr/bin
// 跳到自己的 home 目录
$ cd ~
// 跳到目前目录的上上两层
$ cd ../..
```