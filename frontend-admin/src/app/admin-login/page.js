"use client";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/components/ui/label";

import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import axios from "axios";

const loginSchema = yup.object().shape({
  email: yup.string().email("Email không hợp lệ").required("Email không được để trống"),
  password: yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").required("Mật khẩu không được để trống"),
});

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/users/login", {
        email: data.email,
        password: data.password,
      });

      const result = response.data;

      if (result.success) {
        toast.success(result.message || "Đăng nhập thành công");
        router.push("/dashboard");
      } else {
        toast.error(result.message || "Đăng nhập thất bại");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ffffff] p-6">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <Card className="w-[400px] max-w-lg border border-blue-500 shadow-lg p-6">
          <CardHeader className="text-center">
            <CardTitle>
              <img src="/images/logo.jpg" alt="Admin Panel" className="w-24 mx-auto" />
            </CardTitle>
            <CardDescription className="text-center text-[#1CA2C1] text-[16px]">
              Đăng nhập vào tài khoản quản trị
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="loginEmail" className="text-[#086280]">Email</Label>
                  <Input
                    id="loginEmail"
                    type="email"
                    {...register("email")}
                    placeholder="Nhập email của bạn"
                    className="col-span-3 dark:border-gray-400 border-[#0E42D2] placeholder:text-gray-400"
                    disabled={loading}
                  />
                  {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loginPassword" className="text-[#086280]">Mật khẩu</Label>
                  <Input
                    id="loginPassword"
                    type="password"
                    {...register("password")}
                    placeholder="Nhập mật khẩu của bạn"
                    className="col-span-3 dark:border-gray-400 border-[#0E42D2] placeholder:text-gray-400"
                    disabled={loading}
                  />
                  {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
                <Button className="w-full bg-[#23CAF1] text-white mt-5" type="submit" disabled={loading}>
                  <LogIn className="mr-2 w-4 h-4" /> {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Page;
