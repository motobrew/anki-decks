#!/usr/bin/env bash

target_dir=../archive/pinnacle_day1-7

ls -tr $target_dir | while read file
do
    E1=$(cat $target_dir/$file | grep "E-1:" | sed 's/E-1://g')
    E2=$(cat $target_dir/$file | grep "E-2:" | sed 's/E-2://g')
    J1=$(cat $target_dir/$file | grep "J-1:" | sed 's/J-1://g')
    J2=$(cat $target_dir/$file | grep "J-2:" | sed 's/J-2://g')

    echo -e "<ol><li>$E1</li> <li>$E2</li></ol> \t <ol><li>$J1</li> <li>$J2</li></ol> "
done