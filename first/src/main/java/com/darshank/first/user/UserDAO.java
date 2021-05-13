package com.darshank.first.user;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class UserDAO {
	private static List<User> users = new ArrayList<>();
	private static int usersCount = 4;
	static {
		users.add(new User(1, "Cristiano", new Date()));
		users.add(new User(2, "Ronaldo", new Date()));
		users.add(new User(3, "Luke", new Date()));		
		users.add(new User(4, "Shaw", new Date()));
	}
	
	public List<User> getAllUsers(){
		return users;
	}
	
	public User saveUser(User user) {
		if(user.getId()==null) user.setId(++usersCount);
		user.setDob(new Date());
		users.add(user);
		return user;
	}
	
	public User findUsers(int id) {
		for(User use: users) {
			if(use.getId()==id) return use;
		}
		return null;
	}
}
