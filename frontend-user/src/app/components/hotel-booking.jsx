"use client"

import { useState, useEffect } from "react"
import { Calendar } from "/src/components/ui/calendar"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "/src/components/ui/card"
import { Input } from "/src/components/ui/input"
import { Label } from "/src/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "/src/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "/src/components/ui/select"
import { Separator } from "/src/components/ui/separator"
import { Badge } from "/src/components/ui/badge"
import { Bed, Coffee, Wifi, Tv, Users, CalendarIcon, CheckCircle } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "/src/components/ui/popover"
import { format } from "date-fns"
import { cn } from "/src/lib/utils"
import axios from "axios";

export default function HotelBooking() {
  const [selectedRoom, setSelectedRoom] = useState("standard")
  const [checkInDate, setCheckInDate] = useState(null)
  const [checkOutDate, setCheckOutDate] = useState(null)
  const [guests, setGuests] = useState("1")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  })
  const [isBooked, setIsBooked] = useState(false)
  const [checkInDateDisplay, setCheckInDateDisplay] = useState("");
  const [checkOutDateDisplay, setCheckOutDateDisplay] = useState("");

  const rooms = {
    standard: {
      name: "Phòng Tiêu Chuẩn",
      price: 800000,
      description: "Phòng thoải mái với đầy đủ tiện nghi cơ bản",
      image: ["/room/room1.jpg"],
      amenities: ["Wifi miễn phí", "TV màn hình phẳng", "Điều hòa", "Bữa sáng"],
    },
    deluxe: {
      name: "Phòng Deluxe",
      price: 1200000,
      description: "Phòng rộng rãi với tầm nhìn đẹp và tiện nghi cao cấp",
      image: ["/room/room2.jpg"],
      amenities: ["Wifi miễn phí", "TV màn hình phẳng", "Điều hòa", "Bữa sáng", "Minibar", "Bồn tắm"],
    },
    suite: {
      name: "Phòng Suite",
      price: 2000000,
      description: "Phòng sang trọng với không gian rộng rãi và dịch vụ VIP",
      image: ["/room/room3.jpg"],
      amenities: [
        "Wifi miễn phí",
        "TV màn hình phẳng",
        "Điều hòa",
        "Bữa sáng",
        "Minibar",
        "Bồn tắm",
        "Phòng khách riêng",
        "Dịch vụ phòng 24/7",
      ],
    },
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const calculateTotalPrice = () => {
    if (!checkInDate || !checkOutDate) return 0

    const start = new Date(checkInDate)
    const end = new Date(checkOutDate)
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return rooms[selectedRoom].price * diffDays
  }

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      // Lấy id khách hàng từ localStorage
      const userId = localStorage.getItem("userId");
      // Gọi API lấy phòng trống
      const res = await axios.get("http://localhost:8080/api/rooms/available", {
        params: {
          checkinDate: checkInDate ? format(new Date(checkInDate), "yyyy-MM-dd") : null,
          checkoutDate: checkOutDate ? format(new Date(checkOutDate), "yyyy-MM-dd") : null
        }
      });
      const availableRooms = res.data;
      if (!availableRooms.length) {
        alert("Không còn phòng trống cho lựa chọn này!");
        return;
      }
      const bookingData = {
        idCustomer: userId ? Number(userId) : null,
        idRoom: availableRooms[0].id, // lấy id phòng đầu tiên còn trống
        checkinDate: checkInDate ? format(new Date(checkInDate), "yyyy-MM-dd") : null,
        checkoutDate: checkOutDate ? format(new Date(checkOutDate), "yyyy-MM-dd") : null,
        deposit: 0
      };
      await axios.post("http://localhost:8080/api/bookings", bookingData);
      setIsBooked(true);
    } catch (error) {
      // Log chi tiết lỗi từ backend (nếu có)
      if (error.response) {
        console.error("Booking error status:", error.response.status);
        console.error("Booking error data:", error.response.data);
        alert("Đặt phòng thất bại! " + (error.response.data?.message || "Vui lòng thử lại."));
      } else {
        console.error(error);
        alert("Đặt phòng thất bại! Vui lòng thử lại.");
      }
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)
  }

  useEffect(() => {
    setCheckInDateDisplay(checkInDate ? format(new Date(checkInDate), "dd/MM/yyyy") : "");
  }, [checkInDate]);

  useEffect(() => {
    setCheckOutDateDisplay(checkOutDate ? format(new Date(checkOutDate), "dd/MM/yyyy") : "");
  }, [checkOutDate]);

  return (
    <div className="container mx-auto py-8 px-4">
      {isBooked ? (
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="text-center bg-green-50 border-b">
            <CardTitle className="text-2xl text-green-700 flex items-center justify-center gap-2">
              <CheckCircle className="h-6 w-6" />
              Đặt phòng thành công!
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 pb-4">
            <div className="space-y-4">
              <div className="text-center mb-6">
                <p className="text-muted-foreground">Cảm ơn bạn đã chọn khách sạn của chúng tôi!</p>
                <p className="font-medium mt-2">Chúng tôi đã gửi xác nhận đặt phòng đến email của bạn.</p>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Chi tiết đặt phòng:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Phòng</p>
                    <p className="font-medium">{rooms[selectedRoom].name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Khách</p>
                    <p className="font-medium">{formData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ngày nhận phòng</p>
                    <p className="font-medium">{checkInDateDisplay}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ngày trả phòng</p>
                    <p className="font-medium">{checkOutDateDisplay}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Số khách</p>
                    <p className="font-medium">{guests}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tổng tiền</p>
                    <p className="font-medium text-green-700">{formatPrice(calculateTotalPrice())}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-6">
            <Button onClick={() => setIsBooked(false)}>Đặt phòng khác</Button>
          </CardFooter>
        </Card>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-center mb-8 text-[#1E3A8A]">Đặt Phòng Khách Sạn</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Chọn phòng và ngày</CardTitle>
                  <CardDescription>Vui lòng chọn loại phòng và thời gian lưu trú</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Tabs defaultValue="standard" value={selectedRoom} onValueChange={setSelectedRoom}>
                    <TabsList className="grid grid-cols-3 mb-4">
                      <TabsTrigger value="standard">Tiêu Chuẩn</TabsTrigger>
                      <TabsTrigger value="deluxe">Deluxe</TabsTrigger>
                      <TabsTrigger value="suite">Suite</TabsTrigger>
                    </TabsList>

                    {Object.keys(rooms).map((roomType) => (
                      <TabsContent key={roomType} value={roomType} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <img
                              src={rooms[roomType].image || "/placeholder.svg"}
                              alt={rooms[roomType].name}
                              className="rounded-lg object-cover w-full h-48"
                            />
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-start">
                              <h3 className="font-semibold text-lg">{rooms[roomType].name}</h3>
                              <Badge variant="outline" className="font-semibold">
                                {formatPrice(rooms[roomType].price)}/đêm
                              </Badge>
                            </div>
                            <p className="text-muted-foreground text-sm">{rooms[roomType].description}</p>
                            <div className="pt-2">
                              <h4 className="text-sm font-medium mb-2">Tiện nghi:</h4>
                              <div className="grid grid-cols-2 gap-y-1 gap-x-4">
                                {rooms[roomType].amenities.map((amenity, index) => (
                                  <div key={index} className="flex items-center gap-1 text-sm">
                                    {index === 0 && <Wifi className="h-3.5 w-3.5" />}
                                    {index === 1 && <Tv className="h-3.5 w-3.5" />}
                                    {index === 2 && <Bed className="h-3.5 w-3.5" />}
                                    {index === 3 && <Coffee className="h-3.5 w-3.5" />}
                                    {index > 3 && <CheckCircle className="h-3.5 w-3.5" />}
                                    <span>{amenity}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="check-in">Ngày nhận phòng</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !checkInDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkInDate ? format(checkInDate, "dd/MM/yyyy") : "Chọn ngày"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={checkInDate}
                            onSelect={setCheckInDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="check-out">Ngày trả phòng</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !checkOutDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkOutDate ? format(checkOutDate, "dd/MM/yyyy") : "Chọn ngày"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={checkOutDate}
                            onSelect={setCheckOutDate}
                            initialFocus
                            disabled={(date) => !checkInDate || date <= checkInDate}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guests">Số lượng khách</Label>
                    <Select value={guests} onValueChange={setGuests}>
                      <SelectTrigger id="guests">
                        <SelectValue placeholder="Chọn số lượng khách" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 người</SelectItem>
                        <SelectItem value="2">2 người</SelectItem>
                        <SelectItem value="3">3 người</SelectItem>
                        <SelectItem value="4">4 người</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Thông tin khách hàng</CardTitle>
                  <CardDescription>Vui lòng điền thông tin của bạn</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Họ và tên</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Nguyễn Văn A"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="example@gmail.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="0912345678"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialRequests">Yêu cầu đặc biệt (nếu có)</Label>
                      <Input
                        id="specialRequests"
                        name="specialRequests"
                        placeholder="Ví dụ: Phòng tầng cao, giường thêm..."
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                      />
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="sticky top-4">
                <CardHeader className="bg-muted">
                  <CardTitle>Tóm tắt đặt phòng</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{rooms[selectedRoom].name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Users className="h-3.5 w-3.5 mr-1" />
                          <span>{guests} khách</span>
                        </div>
                      </div>
                      <Badge variant="outline">{formatPrice(rooms[selectedRoom].price)}/đêm</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Nhận phòng</p>
                        <p className="font-medium">{checkInDateDisplay}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Trả phòng</p>
                        <p className="font-medium">{checkOutDateDisplay}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Giá phòng</span>
                        <span>{formatPrice(calculateTotalPrice())}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Thuế và phí</span>
                        <span>{formatPrice(calculateTotalPrice() * 0.1)}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-semibold">
                      <span>Tổng cộng</span>
                      <span>{formatPrice(calculateTotalPrice() * 1.1)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleBooking}
                    disabled={!checkInDate || !checkOutDate || !formData.name || !formData.email || !formData.phone}
                  >
                    Đặt phòng ngay
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Bạn chưa bị trừ tiền. Bạn sẽ thanh toán khi nhận phòng.
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
