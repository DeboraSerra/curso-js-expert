FOLDER_AMOUNT=4

for index in $(seq 1 $FOLDER_AMOUNT); do
# 1,2 -> bash01, bash02
# 3,4 -> shell03, shell03
folder=$([ $index -ge 3 ] && echo bash0$index || echo shell0$index)

mkdir -p $folder
cd $(pwd)/$folder
npm init -y --scope @debserra --silent > /dev/null
cat package.json

cd ..
done

rm -rf shell* bash*