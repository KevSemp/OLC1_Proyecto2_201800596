package main

import (
	"fmt"          
	"html/template" 
	"net/http"      
)


func index(w http.ResponseWriter, r *http.Request) {
	t := template.Must(template.ParseFiles("index.html")) 
	t.Execute(w, "")                                      
}

func main() {
	http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("./css")))) 
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("js/"))))	
	http.HandleFunc("/", index) 
	fmt.Printf("Servidor: http://localhost:8005/") 
	http.ListenAndServe(":8005", nil)                            
}