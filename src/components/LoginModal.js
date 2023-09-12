import React, { useState } from "react";
import { Modal, Form, Input, Button, Checkbox } from "antd";
import "../css/loginModal.css";
import google from "../img/logo_google_w.png";
import naver from "../img/logo_naver.svg";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ isModalOpen, handleOk }) => {
  const [form] = Form.useForm();
  const [loginDisplay, setLoginDisplay] = useState("block");
  const [recoverDisplay, setRecoverDisplay] = useState("none");
  const [recoverForm, setRecoverForm] = useState("");
  const [loginError, setLoginError] = useState(false);
  // const [isResetButtonDisabled, setIsResetButtonDisabled] = useState(true);
  const navigate = useNavigate();

  const initialValue = {
    remember: "true",
  };

  const handleForgotButton = () => {
    form.resetFields();
    // form.validateFields().then(() => setIsResetButtonDisabled(false));
    setLoginDisplay("none");
    setRecoverDisplay("block");
    setRecoverForm(
      <>
        <p className="text-muted pt10">
          가입한 이메일 주소로 임시 비밀번호를 알려드립니다.
          <br />
          로그인 후 비밀번호를 꼭 변경해주세요.
        </p>
        <Form.Item
          name="email"
          rules={[
            { type: "email", message: "이메일 주소의 형식이 맞지 않습니다." },
          ]}
        >
          <Input
            style={{ height: "40px", marginTop: "20px" }}
            id="sub_username"
            placeholder="Email"
          />
        </Form.Item>
      </>
    );
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://223.130.136.182/auth/signin", {
        username: form.getFieldValue().email, // asj
        password: form.getFieldValue().password, // Tmakxm0)
      });

      if (response.data) {
        console.log("로그인 성공");
        handleOk();
        setLoginError(false);
      }
    } catch (err) {
      console.log(form.getFieldValue().remember);
      // API 요청 실패 시
      if (form.getFieldValue().email && form.getFieldValue().password)
        setLoginError(true);
    }
  };

  const handleSigningIn = () => {
    setLoginDisplay("block");
    setRecoverDisplay("none");
    form.resetFields();
    setLoginError(false);
  };

  return (
    <Modal
      title="Sign In to Growth Platform"
      open={isModalOpen}
      onOk={handleOk}
      afterClose={() => form.resetFields()}
      okText="Log In"
      footer={null}
      closable={false}
      zIndex={2000}
    >
      <Form
        id="loginform"
        form={form}
        initialValues={initialValue}
        style={{ display: loginDisplay }}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please enter your Email" }]}
        >
          <Input
            style={{ height: "40px", marginTop: "20px" }}
            id="username"
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your Password" }]}
        >
          <Input.Password
            style={{ height: "40px" }}
            id="password"
            placeholder="Password"
            autoComplete="on"
          />
        </Form.Item>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <a
              className="login-form-forgot text-dark"
              onClick={handleForgotButton}
            >
              Forgot Password
            </a>
          </Form.Item>
        </div>
      </Form>
      <Form id="recoverform" form={form} style={{ display: recoverDisplay }}>
        {recoverForm}
      </Form>

      {/*
       *** 모달 버튼 ***
       */}
      {loginDisplay === "block" ? (
        <div
          className="loginmodal-footer"
          style={{
            display: "flex",
            flexDirection: "column",

            marginTop: "16px",
          }}
        >
          {loginError && (
            <div className="text-center" style={{ marginBottom: "30px" }}>
              <span className="t-red">
                아이디 또는 비밀번호를 잘못 입력했습니다. <br />
                입력하신 내용을 다시 확인해주세요.
              </span>
            </div>
          )}

          <Button
            form="loginform"
            htmlType="submit"
            type="primary"
            style={{
              backgroundColor: "#41b3f9",
              fontSize: "14px",
              width: "100%",
              height: "40px",
            }}
            onClick={handleLogin}
          >
            Log In
          </Button>
          <div
            className="text-center"
            style={{ marginTop: "15px", marginBottom: "15px" }}
          >
            OR
          </div>
          <Button
            type="default"
            className="bg-white"
            style={{
              backgroundColor: "#f8f8f8 !important",
              fontSize: "14px",
              width: "100%",
              height: "40px",
              marginBottom: "15px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img src={google} className="media_ico" />
            Continue with Google
          </Button>
          <Button
            type="default"
            className="bg-white"
            style={{
              backgroundColor: "#f8f8f8 !important",
              fontSize: "14px",
              width: "100%",
              height: "40px",
              marginBottom: "15px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img src={naver} className="media_ico" />
            Continue with Naver
          </Button>
          <div className="text-center">
            <p>
              Need a Growth Platform account?
              <a
                className="t-blue t-line m-l-5"
                onClick={() => navigate("/register")}
              >
                Create an account
              </a>
            </p>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "35px",
          }}
        >
          <Button
            type="primary"
            style={{
              backgroundColor: "#41b3f9",
              fontSize: "14px",
              width: "100%",
              height: "40px",
              marginBottom: "15px",
            }}
            onClick={() => form.resetFields()}
            // disabled={isResetButtonDisabled}
          >
            Reset
          </Button>
          <div className="text-center">
            <p>
              Did you remember?
              <a className="t-blue t-line m-l-5" onClick={handleSigningIn}>
                Try signing in
              </a>
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default LoginModal;
