import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import logo from "../assets/img/Spotify2.png";
import {
	Box,
	Flex,
	Image,
	Icon,
	Center,
	Input,
	Checkbox,
	InputGroup,
	InputRightElement,
	useToast,
} from "@chakra-ui/react";
import { BsApple, BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth_types } from "../redux/types";
import axios from "axios";
import { userLogin } from "../redux/middlewares/userauth";
import { Toast } from "@chakra-ui/react";

export default function LoginPage() {
	const nav = useNavigate();
	const dispatch = useDispatch();

	const [account, setAccount] = useState({ email: "", password: "" });

	useEffect(() => {}, [account.password]);

	// 	const user = JSON.parse(localStorage.getItem())
	// 	if(user?.email && user?.password )
	// }, []);

	function inputHandler(event) {
		const { value, id } = event.target;
		const tempAccount = { ...account };
		tempAccount[id] = value;
		setAccount(tempAccount);
	}

	const [seePassword, setSeePassword] = useState(false);
	const toast = useToast();

	async function login() {
		// karena butuh waktu untuk mendapatkan data dari API
		// maka function dibuat menjadi async
		// await axios
		// 	.get("http://localhost:2000/user", {
		// 		params: {
		// 			email: account.email.toLowerCase(),
		// 			password: account.password,
		// 		},
		// 	})
		// 	.then((res) => {
		// 		if (res.data.length) {
		// 			dispatch({
		// 				type: auth_types.login,
		// 				payload: res.data[0],
		// 			});
		// 			localStorage.setItem("user", JSON.stringify(res.data[0]));
		// 			return nav("/home");
		// 		} else {
		// 			alert("email/password salah");
		// 		}
		// 	});
		toast.closeAll();
		const status = await dispatch(userLogin(account));
		if (status) {
			toast({
				title: "You are successfully logged in",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
			return nav("/");
		}
		toast({
			title: "Wrong email/password",
			status: "error",
			duration: 3000,
			isClosable: true,
		});
	}

	return (
		<>
			<Center pb={"10%"} flexDir={"column"} w={"100vw"} gap={"40x"}>
				<Center
					width={"100%"}
					paddingTop={"25px"}
					pb={"12px"}
					borderBottom={"1px solid #D9DaDC"}
					color={"whiteAlpha.800"}
					gap={"20px"}
				>
					<Image src={logo} w={"143px"} h={"44px"} />
				</Center>

				<Center
					paddingX={"10px"}
					w={"100%"}
					maxW={"450px"}
					fontSize={"14px"}
					color={"white"}
					flexDir={"column"}
					gap="10px"
				>
					<Center
						cursor={"pointer"}
						w={"100%"}
						bgColor={"#1877F2"}
						h={"48px"}
						fontWeight={"700"}
						borderRadius={"25px"}
						gap={"10px"}
						border={"1px solid #A5A5A5"}
					>
						<Icon w={"20px"} h={"20px"} as={BsFacebook}></Icon>
						<Center color={"white"}>CONTINUE WITH FACEBOOK</Center>
					</Center>

					<Center
						cursor={"pointer"}
						w={"100%"}
						bgColor={"black "}
						h={"48px"}
						fontWeight={"700"}
						borderRadius={"25px"}
						gap={"10px"}
						border={"1px solid #A5A5A5"}
					>
						<Icon w={"20px"} h={"20px"} as={BsApple}></Icon>
						<Center color={"white"}>CONTINUE WITH FACEBOOK</Center>
					</Center>

					<Center
						cursor={"pointer"}
						w={"100%"}
						h={"48px"}
						fontWeight={"700"}
						borderRadius={"25px"}
						gap={"10px"}
						color={"blackAlpha.500"}
						border={"1px solid #A5A5A5"}
						bgColor={"white"}
					>
						<Icon w={"20px"} h={"20px"} as={FcGoogle}></Icon>
						<Center>CONTINUE WITH GOOGLE</Center>
					</Center>

					<Center
						cursor={"pointer"}
						w={"100%"}
						h={"48px"}
						fontWeight={"700"}
						borderRadius={"25px"}
						gap={"10px"}
						color={"blackAlpha.500"}
						border={"1px solid #A5A5A5"}
						bgColor={"white"}
					>
						<Center>CONTINUE WITH PHONE NUMBER</Center>
					</Center>

					<Center
						w={"100%"}
						h={"48px"}
						color={"black"}
						gap={"12px"}
						fontWeight={"700"}
					>
						<Center w={"100%"}>
							<Box h="1px" w={"100%"} bgColor={"#D9DADC"}></Box>
						</Center>
						OR
						<Center w={"100%"}>
							<Box h="1px" w={"100%"} bgColor={"#D9DADC"}></Box>
						</Center>
					</Center>

					<Flex
						w={"100%"}
						pt={"20px"}
						gap={"20px"}
						flexDir={"column"}
						color={"black"}
					>
						<Box
							w={"100%"}
							maxW={"450px"}
							flexDir={"column"}
							gap={"5px"}
						>
							<Box fontWeight={"700"}>
								Email address or username
							</Box>
							<Input
								onChange={inputHandler}
								id="email"
								w={"100%"}
								h={"48px"}
								placeholder="Email addrress or username"
							></Input>
						</Box>

						<Box
							w={"100%"}
							maxW={"450px"}
							flexDir={"column"}
							gap={"5px"}
						>
							<Box fontWeight={"700"}>Password</Box>
							<InputGroup size={"md"}>
								<Input
									onChange={inputHandler}
									id="password"
									w={"100%"}
									h={"48px"}
									placeholder="Password"
									type={seePassword ? "text" : "password"}
								></Input>
								<InputRightElement>
									<Icon
										as={
											seePassword
												? AiOutlineEye
												: AiOutlineEyeInvisible
										}
										color={"#A5A5A5"}
										w={"24px"}
										h={"24px"}
										cursor={"pointer"}
										onClick={() =>
											setSeePassword(!seePassword)
										}
									></Icon>
								</InputRightElement>
							</InputGroup>
							{account.password.length < 8 ? (
								<Box color={"red"}>password minimal 8</Box>
							) : null}
						</Box>

						<Box w={"100%"} flexDir={"column"} gap={"5px"}>
							<Box
								cursor={"pointer"}
								textDecoration={"underline"}
								fontWeight={"700"}
							>
								Forgot password
							</Box>
						</Box>
					</Flex>
					<Flex
						width={"100%"}
						flexDir={"row"}
						fontWeight={"600"}
						gap={"5px"}
						justifyContent={"space-between"}
						color={"black"}
					>
						<Flex alignItems={"flex-start"}>
							<Checkbox colorScheme="green" />
							Remember me
						</Flex>
						<Center
							cursor={"pointer"}
							borderRadius={"25"}
							fontWeight={"600"}
							bgColor={"#1ED760"}
							h={"48px"}
							w={"121px"}
							onClick={login}
						>
							LOG IN
						</Center>
					</Flex>
					<Center w={"100%"}>
						<Box h="1px" w={"100%"} bgColor={"#D9DADC"}></Box>
					</Center>

					<Center
						w={"100%"}
						h={"48px"}
						fontWeight={"700"}
						// borderRadius={"25px"}
						gap={"10px"}
						color={"black"}
						// border={"1px solid #A5A5A5"}
						bgColor={"white"}
					>
						Don't have an account?
					</Center>
					<Center
						w={"100%"}
						h={"48px"}
						fontWeight={"700"}
						borderRadius={"25px"}
						gap={"10px"}
						color={"blackAlpha.500"}
						border={"1px solid #A5A5A5"}
						bgColor={"white"}
					>
						<Link to={"/registerpage"}>
							<Center>SIGN UP FOR SPOTIFY</Center>
						</Link>
					</Center>
				</Center>
			</Center>
		</>
	);
}
