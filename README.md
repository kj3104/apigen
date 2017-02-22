# api-generator
Node.js RESTful API Generator

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

### PORT: Extra parameter
You can choose port number.  
`$ apigen [json file] [PORT num]`

## Example
Create json file [test.json]
```json:test.json
{
  "test" : {
    "params":{
      "param1":"param",
      "param2":100
    }
  },
  "test/test" : {
    "param1":"param",
    "param2":{
      "param2-1":"param",
      "param2-2":100
    }
  }
}
```
Execute node command  
`$ apigen test.json`  
Execute curl comamnd  
`$ curl -X GET http://127.0.0.1:3104/test/test`  
Return  
`{"param1":"param","param2":{"param2-1":"param","param2-2":100}`  

## License
MIT
