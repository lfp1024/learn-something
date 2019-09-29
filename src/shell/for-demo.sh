#!/bin/bash
## seq  用于产生从某个数到另外一个数之间的所有整数。起始默认是 1，间隔默认也是1
## 产生 1 到 10 之间的整数，间隔为2
for i in `seq 1 10`
do 
## [[ ]] 条件判断
## (($exp)) exp 算术表达式
if [[ $((i%2)) == 0 ]];
then 
echo $i;
fi
done

##  bash src/shell/for-demo.sh 用bash执行
## 2 4 6 8 10