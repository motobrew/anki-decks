#!/usr/bin/env bash

input_file=../data/eiken-ex/unit-06.txt
log_base=../logs
now_ts=$(date +%Y%m%d_%H%M%S)
log_dir=$log_base/$now_ts
test -d $log_dir || mkdir -p $log_dir

main () {
    cat $input_file | cut -f 1 |
    while read line
    do
        #key=$(echo $line | sed "s/&#x27;/'/g" | tr -d '"')
        key=$line
        output_file=$log_dir/$(echo $key | sed 's/ /_/g' | sed "s/'//g" | sed 's%/%-%g').txt
        echo "### $(date): Start: [$key]"
        echo "# Key:$key" | tee $output_file
        ts-node src/index.ts "'$key'" | tee -a $output_file
    done
}

main | tee $log_base/all_${now_ts}.log
