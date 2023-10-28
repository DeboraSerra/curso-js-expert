# images
# https://1.bp.blogspot.com/-on9zPrqOUxI/YXdh9ni7NNI/AAAAAAAADqo/EESeNZ1fV54I4JFUd54ATEDStgfPy1vbACLcBGAsYHQ/s800/verdadeira-historia-do-harry-potter-1.png
# https://i.pinimg.com/originals/1a/78/d5/1a78d587da30d6da2af7bc785f7151d4.png

# bg
# https://images.ctfassets.net/usf1vwtuqyxm/71J6YPxNauhFABbjHpGluJ/631bd6980b0a430d5b476ef331abb2b5/release_1_hogwarts.png
# https://i.pinimg.com/originals/b0/ff/1a/b0ff1a3520386aacce5cbad2986edc89.jpg
# https://media.newyorker.com/photos/5d72c37c5c51330008df5089/16:9/w_2560,h_1440,c_limit/LaZebnik--HarryPotter.jpg

IMAGE_URL="https://1.bp.blogspot.com/-on9zPrqOUxI/YXdh9ni7NNI/AAAAAAAADqo/EESeNZ1fV54I4JFUd54ATEDStgfPy1vbACLcBGAsYHQ/s800/verdadeira-historia-do-harry-potter-1.png"
BACKGROUND_URL="https://images.ctfassets.net/usf1vwtuqyxm/71J6YPxNauhFABbjHpGluJ/631bd6980b0a430d5b476ef331abb2b5/release_1_hogwarts.png"

curl "http://localhost:3000/joinImages?img=$IMAGE_URL&background=$BACKGROUND_URL"

autocannon --renderStatusCodes -c 500 "http://localhost:3000/joinImages?img=$IMAGE_URL&background=$BACKGROUND_URL"