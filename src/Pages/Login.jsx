import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [phone, setPhone] = useState('');
    const [hospitals, setHospitals] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handlePhoneChange = async (e) => {
        const val = e.target.value;
        setPhone(val);

        if (val.length === 10) {
            try {
                const response = await axios.post(
                    `https://machinetest.grapesonline.net/api/Login/PreloginAuthentication?Phonenumber=${val}`, {}, { headers: { 'accept': '*/*' } }
                );
                if (response.data && response.data.Hospital) {
                    setHospitals(response.data.Hospital);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (phone.length !== 10) {
            alert("Please enter a valid 10-digit mobile number");
            return;
        }
        if (!selectedHospital) {
            alert("Please select a hospital from the list");
            return;
        }
        setLoading(true);

        const loginData = {
            PhoneNumber: phone,
            HospitalID: selectedHospital,
            Password: password
        };

        try {
            const res = await axios.post(
                'https://machinetest.grapesonline.net/api/Login/UserLogin',
                loginData,
                { headers: { 'Content-Type': 'application/json', 'accept': '*/*' } }
            );

            if (res.data && res.data.Token) {
                localStorage.setItem('token', res.data.Token);
                navigate('/dashboard');
            } else {
                alert("Invalid credentials");
            }
        } catch (err) {
            console.log(err);
            alert("Network Error. Check your connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="medical-grid-bg">
                <div className="login-frame shadow-lg ">
                    <div className="row p-3">
                        <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center p-5 text-center">
                            <h1 style={{ fontSize: '80px', fontWeight: '800', font: "poppins" }} className='grapes-logo'>grapes®</h1>
                            <h4 className="text-secondary fw-normal mb-5 mt-5">Welcome, to Grapes HMS</h4>

                            <div className="my-4">
                                <img
                                    src="https://dehraflicks.com/wp-content/uploads/2025/07/stethoscope-black-transparent-bg-png-dehraflicks-300x300.png"
                                    alt="Logo" className='w-100' />
                            </div>

                            <div className="mt-auto w-100 text-start ps-4">
                                <span className="badge bg-white text-primary p-2 px-3 border shadow-sm fw-bold form-control">
                                    Grapes IDMR
                                </span>
                            </div>
                        </div>


                        <div className="col-lg-6 p-4">
                            <div className="login-card-purple shadow">
                                <h1 className="display-5 fw-bold mb-5">Login</h1>

                                <form onSubmit={handleLogin}>
                                    <div className="mb-4">
                                        <label className="form-label small fw-bold mb-1">Mobile Number</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-custom shadow-sm"
                                            placeholder="Enter mobile number"
                                            value={phone}
                                            onChange={handlePhoneChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label small fw-bold mb-1">Select Hospital</label>
                                        <select
                                            className="form-select form-control-custom shadow-sm"
                                            value={selectedHospital}
                                            onChange={(e) => setSelectedHospital(e.target.value)}
                                            required
                                        >
                                            <option value="">-- Choose Hospital --</option>
                                            {hospitals.map((h) => (
                                                <option key={h.hospital_id} value={h.hospital_id} className="text-dark">
                                                    {h.hospital_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-2">
                                        <label className="form-label small fw-bold mb-1">Password</label>
                                        <div className="position-relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="form-control form-control-custom shadow-sm pe-5"
                                                placeholder="Enter password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                            <i
                                                className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'} position-absolute top-50 end-0 translate-middle-y me-3 text-secondary`}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => setShowPassword(!showPassword)}
                                            ></i>
                                        </div>
                                        <div className="text-end mt-2">
                                            <a href="#" className="text-light fw-bold" style={{ fontSize: '11px', textDecoration: "none" }}>Forget Password ?</a>
                                        </div>
                                    </div>

                                    <div className="text-center mt-5">
                                        <button type="submit" className="btn btn-login text-white shadow" disabled={loading}>
                                            {loading ? 'Logging in...' : 'Log In'}
                                        </button>

                                        <p className="mt-4 text-light" style={{ fontSize: "12px" }}>Or Login with QR Code</p>

                                        <div>
                                            <label htmlFor='file-upload'><img src="https://assets-v2.lottiefiles.com/a/ec4394a2-1151-11ee-ab60-b3dd36237565/iRrhKmHkKY.gif" alt="" style={{ width: "150px", height: "150px" , cursor:"pointer"}}/></label>
                                            <input
                                                id="file-upload"
                                                type="file"
                                                style={{ display: 'none' }}
                                            />
                                        </div>
                                    </div>
                                </form>

                                <div className="d-flex justify-content-between mt-5 pt-4 border-top border-white border-opacity-10 opacity-75" style={{ fontSize: '10px' }}>
                                    <span>Version : 25.8.8</span>
                                    <span>grapeshms@gmail.com</span>
                                    <span>PROD-DB01</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;