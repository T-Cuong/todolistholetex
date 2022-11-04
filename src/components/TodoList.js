import React from "react";
import Todo from "./Todo";

export default function TodoList({ todoList, onCheckBtnClick }) {//ta nhan prop todoList truyen tu App.js ,onCheckBtnClick duoc truyen tu App.js
  return (
    <>
      {todoList.map((todo) => (//todoList.map voi gia tri tra ve la component Todo.js
        <Todo key={todo.id} todo={todo} onCheckBtnClick={onCheckBtnClick} />/*truyen gia tri todo vo thuoc tinh co ten todo cua component todo
        boi vi ta dung method map nen se set 1 thuoc tinh la key cho tung item tra ve giup react biet duoc component nao co su thay doi ve du lieu
        va chi update component do, onCheckBtnClick={onCheckBtnClick} truyen vao onCheckBtnClick vao Todo.js*/
      ))}
    </>
  );
}
