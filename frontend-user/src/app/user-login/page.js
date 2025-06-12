"use client";
import { Button } from "/src/components/ui/button.jsx";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "/src/components/ui/input.jsx";
import { Label } from "/src/components/ui/label";
import { RadioGroup, RadioGroupItem } from "/src/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "/src/components/ui/tabs";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import axios from "axios";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState("login");

  // Schema kiểm tra đầu vào
  const registerSchema = yup.object().shape({
    username: yup.string().required("Tên không được để trống"),
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Email không được để trống"),
    password: yup
      .string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .required("Mật khẩu không được để trống"),
    dateOfBirth: yup.date().required("Ngày sinh không được để trống"),
    gender: yup
      .string()
      .oneOf(["male", "female", "other"], "Vui lòng chọn giới tính")
      .required("Giới tính không được để trống"),
  });

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Email không được để trống"),
    password: yup
      .string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .required("Mật khẩu không được để trống"),
  });

  // Form đăng nhập
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    reset: resetLoginForm,
    formState: { errors: errorsLogin },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  // Form đăng ký
  const {
    register: registerSignUp,
    control,
    handleSubmit: handleSubmitSignUp,
    reset: resetSignUpForm,
    formState: { errors: errorsSignUp },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: { gender: "male" },
  });

  // Xử lý đăng ký
  const onSubmitRegister = async (data) => {
    try {
      // Gọi API tạo user mới
      const userRes = await axios.post("http://localhost:8080/api/users/register", {
        email: data.email,
        password: data.password
      });
      const userResult = userRes.data;
      if (!userResult.success) {
        if (userResult.message && userResult.message.includes("Email đã tồn tại")) {
          toast.error("Email đã tồn tại. Vui lòng dùng email khác.");
        } else {
          toast.error(userResult.message || "Đăng ký thất bại");
        }
        return;
      }
      // Gọi API tạo khách hàng mới
      await axios.post("http://localhost:8080/api/customers", {
        email: data.email,
        name: data.username
      });
      toast.success("Đăng ký tài khoản thành công");
      // Chuyển sang tab đăng nhập sau khi đăng ký thành công
      setTabValue("login");
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra");
    }
  };

  // Xử lý đăng nhập
  const onSubmitLogin = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/users/login", {
        email: data.email,
        password: data.password,
      });

      const result = response.data;

      if (result.success) {
        toast.success(result.message || "Đăng nhập thành công");
        // Lưu id tài khoản vào localStorage
        
        localStorage.setItem("userId", result.id);
        
        router.push("/Homepage");
      } else {
        toast.error(result.message || "Đăng nhập thất bại");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };
  // const onSubmitLogin = async (data) => {
  //   try {
  //     router.push("/");
  //     toast.success("Đăng nhập tài khoản thành công");
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Có lỗi xảy ra");
  //   }
  // };

  // Reset form khi chuyển tab
  useEffect(() => {
    resetLoginForm();
    resetSignUpForm();
  }, [resetLoginForm, resetSignUpForm]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 pt-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-95 max-w-md border-black">
          <CardHeader>
            <CardTitle className="flex justify-center">
              <img src="/images/logo.jpg" alt="logo" className="w-20 grayscale" />
            </CardTitle>
            <CardDescription className="text-center text-black">
            Trải nghiệm thuê phòng khách sạn dễ dàng và nhanh chóng
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-900 text-white">
                <TabsTrigger value="login" className="text-white">
                  Đăng nhập
                </TabsTrigger>
                <TabsTrigger value="signup" className="text-white">
                  Đăng ký
                </TabsTrigger>
              </TabsList>

              {/* Đăng nhập */}
              <TabsContent value="login">
                <form onSubmit={handleSubmitLogin(onSubmitLogin)}>
                  <div className="space-y-4">
                    <div>
                      <Label className="mb-3 block" >Email</Label>
                      <Input
                        type="email"
                        {...registerLogin("email")}
                        placeholder="Nhập email của bạn"
                        className="border-black"
                      />
                      {errorsLogin.email && (
                        <p className="text-red-500">{errorsLogin.email.message}</p>
                      )}
                    </div>
                    <div>
                      <Label className="mb-3 block" >Mật khẩu</Label>
                      <Input
                        type="password"
                        {...registerLogin("password")}
                        placeholder="Nhập mật khẩu của bạn"
                        className="border-black"
                      />
                      {errorsLogin.password && (
                        <p className="text-red-500">{errorsLogin.password.message}</p>
                      )}
                    </div>
                    <Button type="submit" className="w-full bg-black text-white">
                      <LogIn className="mr-2 w-4 h-4" /> Đăng nhập
                    </Button>
                  </div>
                </form>
              </TabsContent>

              {/* Đăng ký */}
              <TabsContent value="signup">
                <form onSubmit={handleSubmitSignUp(onSubmitRegister)}>
                  <div className="space-y-4 ">
                    <div>
                      <Label className="mb-3 block">  Tên người dùng</Label>
                      <Input
                        type="text"
                        {...registerSignUp("username")}
                        placeholder="Nhập tên người dùng"
                        className="border-black"
                      />
                    </div>
                    <div>
                      <Label className="mb-3 block" >Email</Label>
                      <Input
                        type="email"
                        {...registerSignUp("email")}
                        placeholder="Nhập email của bạn"
                        className="border-black"
                      />
                    </div>
                    <div>
                      <Label className="mb-3 block" >Mật khẩu</Label>
                      <Input
                        type="password"
                        {...registerSignUp("password")}
                        placeholder="Nhập mật khẩu"
                        className="border-black"
                      />
                    </div>
                    <div>
                      <Label className="mb-3 block" >Ngày sinh</Label>
                      <Input type="date" {...registerSignUp("dateOfBirth")} className="border-black" />
                    </div>
                    <div>
                      <Label className="mb-3 block" >Giới tính</Label>
                      <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="flex flex-row gap-6 mt-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="male" id="male" />
                              <Label htmlFor="male">Nam</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="female" id="female" />
                              <Label htmlFor="female">Nữ</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="other" id="other" />
                              <Label htmlFor="other">Khác</Label>
                            </div>
                          </RadioGroup>
                        )}
                      />
                    </div>

                    <Button  type="submit w-full bg-black text-white mb-3 block ">
                      Đăng ký
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Page;
