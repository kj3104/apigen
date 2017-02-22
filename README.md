# api-generator
Node.js RESTful API Generator

## Requirement
:star2: Node.js 4.0+

## Installation
### Homebrew
```
$ brew tap luca3104/apigen
$ brew install apigen
```

## Usage
### Create JSON file
```json
{
  "endpoint" : {
    "response-key":"response-value"
  }
}
```

### Execute command
`$ apigen [json file]`

### Check with curl command
`$ curl -X GET http://127.0.0.1:3104/endpoint`  
Return Value is  
`{"response-key":"response-value"}`

### PORT: Optional parameter
You can choose port number.  
`$ apigen [json file] [PORT num]`

### Cutome JSON
You can set detail.  
| Name | Type |  Detail |
|:-----|:----------|:--------|
| status   | number array | success and error status codes |
| require | string array | require parameter for request |
| 200, 400, ...etc | object | response parameter by status |
| 404 | object | object for Not found |

```json
{
  "endpoint" : {
    "status":[200,400],
    "require":["req1","req2"],
    "200":{
      "response-key":"response-value"
    },
    "400":{
      "response-key":"response-value"
    }
  },
  "404":{
    "message":"does not exist"
  }
}
```

## Example
Create json file [test.json]
```json:test.json
{
  "test1" : {
    "status":[200,400],
    "require":["test1","test2"],
    "200":{
      "param1":"param"
    },
    "400":{
      "error":"error"
    }
  },
  "test2" : {
    "params":{
      "param1":"param",
      "param2":100
    }
  },
  "test3" : {
    "param1":"param",
    "param2":{
      "param2-1":"param",
      "param2-2":106
    }
  },
  "404":{
    "message":"does not exist"
  }
}

```
Execute node command  
`$ apigen test.json`  
Execute curl comamnd  
`$ curl -X POST -D - -d '{"test1":"test", "test2":"test"}' http://127.0.0.1:3104/test1`  
Return  
`{"param1": "param"}`  

## Author
[luca3104](https://github.com/luca3104)

## License
MIT
