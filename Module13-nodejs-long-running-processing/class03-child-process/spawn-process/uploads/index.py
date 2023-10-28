import json
import sys
from urllib import request


def main():
    item = json.loads(sys.argv[1])
    url = item.get('url')
    filePath = item.get('filePath')
    with open(filePath, 'rb') as file:
        data = file.read()
        req = request.Request(url, data)
        response = request.urlopen(req).read().decode('utf-8')
        print(response)


if __name__ == '__main__':
    main()