import Button from "@atlaskit/button";
import React from "react";
import styled, { css } from "styled-components";
import CheckIcon from "@atlaskit/icon/glyph/check";

const ButtonStyled = styled(Button)`
  margin-top: 5px;
  text-align: left;

  &,
  &:hover {//khi click check thi isCompleted se la true va duoi la doan code css de viet dau gach ngang qua noi dung cua todo
    ${(p) =>
      p.isCompleted && //neu gia tri prop la true thi gach ngang noi dung
      css`
        text-decoration: line-through;
      `}
  }
//doi voi icon check mac dinh ta se an no di va no chi xuat hien khi ta hover vao no thoi
  &:hover {//giup hien lai icon check khi ta hover vao 1 button
    .check-icon {
      display: inline-block;
    }
  }

  .check-icon {
    display: none;//mac dinh thi ta an check-icon di 

    &:hover {//khi hover vao thi set 1 chut background-color va border-radius
      background-color: #e2e2e2;
      border-radius: 3px;
    }
  }
`;

export default function Todo({ todo, onCheckBtnClick }) {//lay ra gia tri duoc truyen vao tu TodoList.js, onCheckBtnClick duoc truyen tu TodoList.js  
  return (
    <ButtonStyled/*them mot icon co bieu tuong la dau check va khi nguoi dung nhan vao noi dung se bi gach ngang danh dau la da hoan thanh xong item*/
      isCompleted={todo.isCompleted}//truyen vao isCompleted la todo.isCompleted de cap nhat trang true true hoac false
      shouldFitContainer
      iconAfter={
        !todo.isCompleted && (//khi gia tri cua todo.isCompleted la false thi ta moi hien ra check icon nay 
           <span className='check-icon' onClick={() => onCheckBtnClick(todo.id)}>/*khi click vao check icon ta se goi den onCheckBtnClick va truyen vao id cua todo hien tai*/
            <CheckIcon primaryColor='#4fff4f' />/*CheckIcon lay tu atlaskit */
          </span>
        )
      }
    >
      {todo.name}
    </ButtonStyled>
  );
}
