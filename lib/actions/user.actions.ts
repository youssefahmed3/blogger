"use server";
import {connectToDb} from "../mongoose";
import User from "../models/user.model";




export async function createUser({username, password, email}: { username: string, password: string, email: string }) {
    try {
        await connectToDb();
        const user = await User.create({
            username: username,
            email: email,
            password: password,
    });
    await user.save();

    console.log(user);
    } catch (error:any) {
        console.log(error.message);
        
    }    
};

export async function fetchAllUsers() {
    try {
        await connectToDb();
        const users = await User.find({}); // find all users
        console.log(users);
        return users.map(user => user.toObject({ getters: true, virtuals: false })); // convert each user to a plain object
    } catch (error:any) {
        console.log(error.message);
    }
};

export async function fetchUserById(id: string) {
    try {
        await connectToDb();
        const user = await User.findById(id);
        console.log(user);
        return user.toObject({ getters: true, virtuals: false }); // convert user to a plain object
    } catch (error:any) {
        console.log(error.message);
    }
}

export async function fetchUserByUsername(username: string) {
    try {
        
        await connectToDb();
        const user = await User.findOne({ username: username });
        console.log(user);
        return user.toObject({ getters: true, virtuals: false }); // convert user to a plain object
        
    } catch(error:any) {
        console.log(error.message);
    }
}