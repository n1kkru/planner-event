import React, { JSXElementConstructor, SyntheticEvent, useState } from 'react';
import { ChangeEvent, ReactElement } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'src/services/store';
import { Button } from 'src/ui/Button';

export type ModalAuthProps = {
  email: string,
  password: string,
  isOpen: boolean, 
  onClose: () => void,
  onChangeEmail: any,
  onChangePassword: any,
  onSubmit: (e: SyntheticEvent) => void
};

export const ModalAuth = ({email, password, isOpen, onClose, onChangeEmail, onChangePassword, onSubmit} : ModalAuthProps ) => {
  const [step, setStep] = useState('email')

  const modalContent = 
    (
      <form className="content" onSubmit={() => {
        setStep('pass');
      }}>
        <input 
          placeholder="Email" 
          value={email}
          name="email"
          onChange={onChangeEmail}
        />
      <Button type="submit" name="next" text="Далее" className="button"/>
      </form>
    ) 

  const passContent = 
    (
      <form className="content" onSubmit={onSubmit}>
        <input 
          placeholder="Password" 
          value={password}
          name="emaipasswordl"
          onChange={onChangePassword}
        />
      <Button type="submit" name="signIn" text="Войти" className="button"/>
      </form>
    ) 
  ;
  
  return (
    <Modal 
        isOpen={isOpen} 
        onRequestClose={onClose} 
        style={{
          overlay: {position: "fixed", background: "rgba(0, 0, 0, 0.2)", zIndex: "15"}, 
          content: {position: "fixed", background: "white", zIndex: "16"}
        }} 
        className="modal"
      >
      <h3 className="header">Вход</h3>
        {step === "email" && modalContent}
        {step === "pass" && passContent}
    </Modal>
)}