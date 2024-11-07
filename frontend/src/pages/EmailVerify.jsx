import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";



const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = import.meta.env.VITE_BACKEND_URL + `/verify/${param.id}`;
				const { data } = await axios.get(url);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);

	return (
		<div>
			{validUrl ? (
				<div    >

					<h1>Email verified successfully</h1>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</div>
	);
};

export default EmailVerify;