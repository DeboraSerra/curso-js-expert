# a partir da pasta raiz
find . -name *.test.js
find . -name *.test.js -not -path '*node_modules**'

npm i -g ipt
find . -name *.test.js -not -path '*node_modules**' | ipt

# a partir do modulo5
# 1s -> primeira linha
# ^ -> inicio da linha
# substitui o inicio da linha por 'use strict';
# quebrou a linha para adicionar o \n implicito

CONTENT="'use strict';"
find . -name *.js -not -path '*node_modules**' \
| xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\
/g' {file}
