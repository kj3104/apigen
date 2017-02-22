# api-generator
Node.js RESTful API Generator

## Usage

### Homebrew
#### Execute command
```
$ brew tap luca3104/apigen
$ brew install apigen
```

### Download this repository
#### Create JSON file
```json
{
  "endpoint" : {
    "response-key":"response-value"
  }
}
```

`$ node api-gen [json file]`

#### Check with curl command
`$ curl -X GET http://127.0.0.1:3104/endpoint`  
Return Value is  
`{"response-key":"response-value"}`

#### Port: Extra parameter
You can choose port number.  
`$ node api-gen [json file] [port num]`

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
`$ node api-gen test.json`  
Execute curl comamnd  
`$ curl -X GET http://127.0.0.1:3104/test/test`  
Return  
`{"param1":"param","param2":{"param2-1":"param","param2-2":100}`  

## License
MIT
