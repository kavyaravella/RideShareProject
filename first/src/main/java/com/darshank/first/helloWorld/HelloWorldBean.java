package com.darshank.first.helloWorld;

public class HelloWorldBean {

	String message;
	int age;
	public HelloWorldBean(String string) {
		this.message = string;
		this.age = 36;
		// TODO Auto-generated constructor stub
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	@Override
	public String toString() {
		return "HelloWorldBean [message=" + message + "]";
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	

}
