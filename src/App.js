import TodoList from "./components/TodoList";
import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { useCallback, useState, useEffect } from "react";
import { v4 } from "uuid";

const TODO_APP_STORAGE_KEY = "TODO_APP";

function App() {
  const [todoList, setTodoList] = useState([]);//luu tru va cap nhat state
  const [textInput, setTextInput] = useState("");//luu gia tri ma nguoi dung nhap vao the input 

  /*khi ta luu dc gia tri cua todlist vao localstorage thanh cong khi ta mo app len ta can lay ra gia tri nay  */
  useEffect(() => {
    const storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storagedTodoList) {/*khi app duoc load len lan dau tien ta se kiem tra xem trong localStorage co gia tri cho key la
    TODO_APP_STORAGE_KEY hay khong */
      setTodoList(JSON.parse(storagedTodoList));/**neu co setTodolis voi gia tri storagedTodoList, JSON.parse de chuyen doi 1 string thanh mot array */
    }
  }, []);
/**khi ta reload noi dung cua toan bo trang web bi mat di vi vay de luu lai du lieu sau khi reload ta dung localStorage  */
  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);//khi gia tri todoList thay doi thi luu no lai vao localStorage.setItem, JSON.stringify(todoList) de chuyen gia tri arr todoList thanh 1 string

  const onTextInputChange = useCallback((e) => {/*dung useCallback bien onTexInputChange va onAddBtnClick se ko
  bi khoi tao lai sao moi lan app rerender*/
    setTextInput(e.target.value);//e.target.value la noi dung ma nguoi dung da nhap vao input
  }, []);

  const onAddBtnClick = useCallback(/*giai thich phia ben tren*/
    (e) => {
      // them text input vao danh sach todoList
      setTodoList([
        { id: v4(), name: textInput, isCompleted: false },/*name chinh la noi dung nguoi dung nhap vao the input ta se lay ra bang cach goi den state textinput, 
        isCompleted de xac dinh xem viec can lam nay da duoc hoan thanh hay chua va mac dinh no la false
        id su dung method v4 cua mot package co ten la uuid no giup tao ra 1 uuid duy nhat */
        ...todoList,//coppy la arr chua cac noi dung todoList cu
      ]);

      setTextInput("");/*khi ta nhan them thanh cong thi noi dung cua input quay ve empty*/
    },
    [textInput, todoList]/*vi ta goi toi textInput phia ben ngoai vi vay ta them no vao empty array co nghia la khi
    co su thay doi cua textInput thi function se duoc chay lai de cap nhat gia tri moi nhat cua textInput, tương
    tu voi ToDoList*/
  );

  /**khi nhan check icon ta can cap nhat mot gia tri vao todolist trong App.js nen ta can truyen 1 method tu App.js TodoList.js -> Todo.js
   */
  const onCheckBtnClick = useCallback((id) => {/*sau khi ta co dc id can cap nhat ta se filter tren todoList de tim ra viec can lam
  nao co id tuong ung va cap nhat lai gia tri cho isCompleted tu false thanh true */
    setTodoList((prevState) =>/**function co tham so la prevState va ta se return ve 1 arr */
      prevState.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo/**neu todo.id = id cua tham so thi ta se tra ve mot gia tri do la
        tat ca cac thuoc tinh cua todo hien tai va set lai isCompleted thanh true, nguoc lai neu ko phai la id truyen vao thi tra ve
        mot todo binh thuong ko update gi het  */
      )
    );
  }, []);

  return (
    <>
      <h3>Danh sách cần làm</h3>
      <Textfield
        name='add-todo'
        placeholder='Thêm việc cần làm...'
        elemAfterInput={
          <Button
            isDisabled={!textInput}//bat tat button , khi textInput co gia tri thi bat button va nguoc lai 
            appearance='primary'
            onClick={onAddBtnClick}//onclick goi toi function onAddBtnClick
          >
            Thêm
          </Button>
        }
        css={{ padding: "2px 4px 2px" }}
        value={textInput}
        onChange={onTextInputChange}//lang nghe su kien nguoi dung nhap input vao 
      ></Textfield>
      <TodoList todoList={todoList} onCheckBtnClick={onCheckBtnClick} />{/*truyen state todoList vao component de render gia tri nguoi
      dung da nhap vao, ta truyen vao todoList qua 1 prop co ten la todoList prop nay co gia tri la state todoList o phia tren */}
    </>
  );
}

export default App;
