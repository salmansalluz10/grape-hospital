import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Activity, BedDouble, Settings, LogOut, Users, Clock, Search, Bell, Sparkles, Menu, X, BellRingIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import grapesLogo from '../assets/grapeslogo.png';


const Dashboard = () => {
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) navigate('/');
        else setIsAuthorized(true);
    }, [navigate]);

    if (!isAuthorized) return null;

    return (
        <div className="d-flex w-100" style={{ backgroundColor: '#06080c', color: 'white', minHeight: '100vh', overflowX: 'hidden' }}>

            {isSidebarOpen && (
                <div
                    className="position-fixed w-100 h-100 d-md-none"
                    style={{ background: 'rgba(0,0,0,0.7)', zIndex: 999 }}
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <div className={`position-fixed h-100 border-end border-dark p-3 d-flex flex-column transition-all ${isSidebarOpen ? 'd-flex' : 'd-none'} d-md-flex`}
                style={{
                    width: '250px',
                    backgroundColor: '#0a0b10',
                    zIndex: 1000,
                    left: isSidebarOpen ? '0' : (window.innerWidth < 768 ? '-250px' : '0'),
                    transition: '0.3s'
                }}>

                <div className="d-flex justify-content-between align-items-center mb-5 p-2 bg-white rounded w-50">
                    <Link to={'/'} className="w-100 text-center"><img src={grapesLogo} alt="Logo" className='w-100' /></Link>
                    <X className="d-md-none text-dark" onClick={() => setIsSidebarOpen(false)} style={{ cursor: 'pointer' }} />
                </div>

                <div className="nav flex-column gap-2">
                    <SidebarLink icon={<LayoutDashboard size={18} />} label="Dashboard" active />
                    <SidebarLink icon={<Activity size={18} />} label="Analyze" />
                    <SidebarLink icon={<BedDouble size={18} />} label="Bed Occupancy" />
                    <SidebarLink icon={<Users size={18} />} label="Patient Queue" />
                </div>

                <div className="mt-auto border-top border-dark pt-3">
        
                    <div className="nav-link text-secondary p-3 d-flex align-items-center " style={{ cursor: 'pointer' }}>
                        <div className="d-flex align-items-center">
                            <i className="fa-solid fa-bell me-2" style={{ fontSize: '18px' }}></i>
                            <span className="fw-medium">Notifications</span>
                        </div>
                        <span className="badge rounded-pill bg-danger ms-5" style={{ fontSize: '10px' }}>3</span>
                    </div>

                   
                    <SidebarLink icon={<i className="fa-solid fa-gear" style={{ fontSize: '18px' }}></i>} label="Settings" />

                  
                    <div className="nav-link text-danger border border-danger text-light rounded-2 p-3 d-flex align-items-center" style={{ cursor: 'pointer' }} onClick={() => { localStorage.clear(); navigate('/'); }}>
                        <i className="fa-solid fa-right-from-bracket text-danger me-2" style={{ fontSize: '18px' }}></i>
                        <span className="fw-medium text-danger">Logout</span>
                    </div>
                </div>
            </div>

          
            <div className="flex-grow-1" style={{ marginLeft: window.innerWidth > 768 ? '250px' : '0', padding: '20px', maxWidth: '100%' }}>

                
                <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
                    <div className="d-flex align-items-center gap-3">
                        <Menu className="d-md-none" onClick={() => setIsSidebarOpen(true)} style={{ cursor: 'pointer' }} />
                        <div>
                            <h2 className="fw-bold mb-0 fs-4 fs-md-2">Admission Desk</h2>
                            <p className="text-secondary d-none d-sm-block small mb-0">{new Date().toDateString()} • Real-time hospital Insights</p>
                        </div>
                    </div>

                    <div className="d-flex gap-2 gap-md-3">
                        <div className="bg-dark p-2 rounded-circle border border-secondary d-flex align-items-center" style={{ cursor: "pointer" }}>
                            <Bell size={18} />
                        </div>
                        <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', cursor: "pointer" }}>
                            <span className="fw-bold">S</span>
                        </div>
                    </div>
                </div>

              
                <div className="d-flex flex-column flex-md-row gap-2 p-2 p-md-2 mb-4 shadow" style={{ backgroundColor: '#11131f', border: '1px solid #1f2235', borderRadius: "15px" }}>
                    <div className="d-flex align-items-center flex-grow-1 px-2">
                        <Search size={18} className="text-secondary me-2" />
                        <input type="text" className="bg-transparent border-0 text-white w-100" placeholder="Ask AI anything... (e.g.,'Show me ICU bed status')" style={{ outline: 'none', fontSize: '14px' }} />
                    </div>
                    <div className="d-flex align-items-center justify-content-center gap-2 px-4 py-2"
                        style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', borderRadius: "10px", cursor: 'pointer' }}>
                        <Sparkles size={16} />
                        <span className="fw-bold small">AI</span>
                    </div>
                </div>

                <div className="row g-4">
                  
                    <div className="col-12">
                        <div className="card border-0 p-2 p-md-4" style={{ backgroundColor: '#11131f', borderRadius: '16px' }}>
                            <div><h4 className="mb-4 text-light fw-bold"><i class="fa-solid fa-arrow-trend-up bg-light text-dark fs-3" style={{ borderRadius: "10px" }}></i> Trends</h4>
                            </div>
                            <div className="d-flex row g-3">
                                <div className='col-md-3'>
                                    <div className='p-3 border rounded-2 shadow'>
                                        <h3><i class="fa-solid fa-people-group"></i></h3>
                                        <p style={{ fontSize: "12px", color: "gray" }}>Expected Patient Count</p>
                                        <p className='fs-3 fw-bold'>284</p>
                                        <p style={{ fontSize: "12px", color: "gray" }}>Today</p>
                                        <p style={{ fontSize: "12px", color: "green" }} className='fw-bold'>+12%</p>
                                    </div>
                                </div>

                                <div className='col-md-3'>
                                    <div className='p-3 border rounded-2 shadow'>
                                        <h3><i class="fa-regular fa-clock"></i></h3>
                                        <p style={{ fontSize: "12px", color: "gray" }}>Peak Time</p>
                                        <p className='fs-3 fw-bold'>2:30 PM</p>
                                        <p style={{ fontSize: "12px", color: "gray" }}>Highest Traffic</p>
                                        <p style={{ fontSize: "12px", color: "blue" }} className='fw-bold'>Next: 6.45 PM</p>
                                    </div>
                                </div>

                                <div className='col-md-3'>
                                    <div className='p-3 border rounded-2 shadow'>
                                        <h3><i class="fa-solid fa-heart-pulse"></i></h3>
                                        <p style={{ fontSize: "12px", color: "gray" }}>Patient Admissions</p>
                                        <p className='fs-3 fw-bold'>156</p>
                                        <p style={{ fontSize: "12px", color: "gray" }}>This week</p>
                                        <p style={{ fontSize: "12px", color: "green" }} className='fw-bold'>+8%</p>
                                    </div>
                                </div>

                                <div className='col-md-3'>
                                    <div className='p-3 border rounded-2 shadow'>
                                        <h3><i class="fa-solid fa-bed"></i></h3>
                                        <p style={{ fontSize: "12px", color: "gray" }}>Total Beds</p>
                                        <p className='fs-3 fw-bold'>450</p>
                                        <p style={{ fontSize: "12px", color: "gray" }}>156 available</p>
                                        <p style={{ fontSize: "12px", color: "blue" }} className='fw-bold'>65% occupied</p>
                                    </div>
                                </div>

                            </div>
                            <div className='border p-2 rounded-2 mt-5'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <h6 className='fw-bold' style={{ fontSize: "14px" }}>Weekly Overview</h6>
                                    <h6><i class="fa-solid fa-angle-down"></i></h6>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    <div className="col-12 col-xl-8">
                        <div className="card border-0 p-3 p-md-4 mb-4" style={{ backgroundColor: '#11131f', borderRadius: '16px' }}>
                            <div className='d-flex justify-content-between'>
                                <h4 className="mb-4 text-light fw-bold"><i class="fa-solid fa-bed fs-3" style={{ borderRadius: "10px" }}></i> Bed Occupancy</h4>
                                <h5><i class="fa-solid fa-filter" style={{ color: "gray" }}></i></h5>
                            </div>
                            <div className='d-flex gap-3 w-100 justify-content-between'>
                                <div className='w-100'>
                                    <p style={{ fontSize: "12px", color: "gray" }} className='fw-bold'>Department</p>
                                    <input type="text" className='form-control' disabled style={{ backgroundColor: "black" }} /></div>

                                <div className='w-100'>
                                    <p style={{ fontSize: "12px", color: "gray" }} className='fw-bold'>Status</p>
                                    <input type="text" className='form-control' style={{ backgroundColor: "black" }} disabled /></div>
                            </div>
                            <div>

                                <div className="row g-3 mt-4">

                                    <div className="col-lg-2 col-md-3 col-6">
                                        <div className="rounded p-3 text-center" style={{ backgroundColor: '#2d0a0a', border: '1px solid #450a0a' }}>
                                            <i className="fa-solid fa-bed mb-2" style={{ color: '#f87171' }}></i>
                                            <div style={{ fontSize: '11px', fontWeight: 'bold' }}>B-101</div>
                                            <div style={{ fontSize: '9px', color: '#f87171' }}>OCCUPIED</div>
                                        </div>
                                    </div>


                                    <div className="col-lg-2 col-md-3 col-6">
                                        <div className="rounded p-3 text-center" style={{ backgroundColor: '#0a0b10', border: '1px solid #1f2235' }}>
                                            <i className="fa-solid fa-bed mb-2 text-secondary"></i>
                                            <div style={{ fontSize: '11px' }}>B-102</div>
                                            <div style={{ fontSize: '9px', color: '#10b981' }}>AVAILABLE</div>
                                        </div>
                                    </div>


                                    <div className="col-lg-2 col-md-3 col-6">
                                        <div className="rounded p-3 text-center" style={{ backgroundColor: '#0a0b10', border: '1px solid #1f2235' }}>
                                            <i className="fa-solid fa-bed mb-2 text-secondary"></i>
                                            <div style={{ fontSize: '11px' }}>B-103</div>
                                            <div style={{ fontSize: '9px', color: '#10b981' }}>AVAILABLE</div>
                                        </div>
                                    </div>


                                    <div className="col-lg-2 col-md-3 col-6">
                                        <div className="rounded p-3 text-center" style={{ backgroundColor: '#2d0a0a', border: '1px solid #450a0a' }}>
                                            <i className="fa-solid fa-bed mb-2" style={{ color: '#f87171' }}></i>
                                            <div style={{ fontSize: '11px', fontWeight: 'bold' }}>B-104</div>
                                            <div style={{ fontSize: '9px', color: '#f87171' }}>OCCUPIED</div>
                                        </div>
                                    </div>


                                    <div className="col-lg-2 col-md-3 col-6">
                                        <div className="rounded p-3 text-center" style={{ backgroundColor: '#0a0b10', border: '1px solid #1f2235' }}>
                                            <i className="fa-solid fa-bed mb-2 text-secondary"></i>
                                            <div style={{ fontSize: '11px' }}>B-105</div>
                                            <div style={{ fontSize: '9px', color: '#10b981' }}>AVAILABLE</div>
                                        </div>
                                    </div>


                                    <div className="col-lg-2 col-md-3 col-6">
                                        <div className="rounded p-3 text-center" style={{ backgroundColor: '#0a0b10', border: '1px solid #1f2235' }}>
                                            <i className="fa-solid fa-bed mb-2 text-secondary"></i>
                                            <div style={{ fontSize: '11px' }}>B-106</div>
                                            <div style={{ fontSize: '9px', color: '#10b981' }}>AVAILABLE</div>
                                        </div>
                                    </div>


                                    <div className="col-lg-2 col-md-3 col-6">
                                        <div className="rounded p-3 text-center" style={{ backgroundColor: '#0a0b10', border: '1px solid #1f2235' }}>
                                            <i className="fa-solid fa-bed mb-2 text-secondary"></i>
                                            <div style={{ fontSize: '11px' }}>B-107</div>
                                            <div style={{ fontSize: '9px', color: '#10b981' }}>AVAILABLE</div>
                                        </div>
                                    </div>

                                    <div className="col-lg-2 col-md-3 col-6">
                                        <div className="rounded p-3 text-center" style={{ backgroundColor: '#0a0b10', border: '1px solid #1f2235' }}>
                                            <i className="fa-solid fa-bed mb-2 text-secondary"></i>
                                            <div style={{ fontSize: '11px' }}>B-108</div>
                                            <div style={{ fontSize: '9px', color: '#10b981' }}>AVAILABLE</div>
                                        </div>
                                    </div>

                                    <div className="col-lg-2 col-md-3 col-6">
                                        <div className="rounded p-3 text-center" style={{ backgroundColor: '#2d0a0a', border: '1px solid #450a0a' }}>
                                            <i className="fa-solid fa-bed mb-2" style={{ color: '#f87171' }}></i>
                                            <div style={{ fontSize: '11px', fontWeight: 'bold' }}>B-109</div>
                                            <div style={{ fontSize: '9px', color: '#f87171' }}>OCCUPIED</div>
                                        </div>
                                    </div>


                                    <div className="col-lg-2 col-md-3 col-6">
                                        <div className="rounded p-3 text-center" style={{ backgroundColor: '#0a0b10', border: '1px solid #1f2235' }}>
                                            <i className="fa-solid fa-bed mb-2 text-secondary"></i>
                                            <div style={{ fontSize: '11px' }}>B-110</div>
                                            <div style={{ fontSize: '9px', color: '#10b981' }}>AVAILABLE</div>
                                        </div>
                                    </div>

                                    <div className="col-lg-2 col-md-3 col-6">
                                        <div className="rounded p-3 text-center" style={{ backgroundColor: '#0a0b10', border: '1px solid #1f2235' }}>
                                            <i className="fa-solid fa-bed mb-2 text-secondary"></i>
                                            <div style={{ fontSize: '11px' }}>B-111</div>
                                            <div style={{ fontSize: '9px', color: '#10b981' }}>AVAILABLE</div>
                                        </div>
                                    </div>

                                    <div className="col-lg-2 col-md-3 col-6">
                                        <div className="rounded p-3 text-center" style={{ backgroundColor: '#0a0b10', border: '1px solid #1f2235' }}>
                                            <i className="fa-solid fa-bed mb-2 text-secondary"></i>
                                            <div style={{ fontSize: '11px' }}>B-112</div>
                                            <div style={{ fontSize: '9px', color: '#10b981' }}>AVAILABLE</div>
                                        </div>
                                    </div>

                                    <div className="col-lg-2 col-md-3 col-6">
                                        <div className="rounded p-3 text-center" style={{ backgroundColor: '#0a0b10', border: '1px solid #1f2235' }}>
                                            <i className="fa-solid fa-bed mb-2 text-secondary"></i>
                                            <div style={{ fontSize: '11px' }}>B-113</div>
                                            <div style={{ fontSize: '9px', color: '#10b981' }}>AVAILABLE</div>
                                        </div>
                                    </div>

                                    <div className="col-lg-2 col-md-3 col-6">
                                        <div className="rounded p-3 text-center" style={{ backgroundColor: '#0a0b10', border: '1px solid #1f2235' }}>
                                            <i className="fa-solid fa-bed mb-2 text-secondary"></i>
                                            <div style={{ fontSize: '11px' }}>B-114</div>
                                            <div style={{ fontSize: '9px', color: '#10b981' }}>AVAILABLE</div>
                                        </div>
                                    </div>

                                    <div className="col-lg-2 col-md-3 col-6">
                                        <div className="rounded p-3 text-center" style={{ backgroundColor: '#0a0b10', border: '1px solid #1f2235' }}>
                                            <i className="fa-solid fa-bed mb-2 text-secondary"></i>
                                            <div style={{ fontSize: '11px' }}>B-115</div>
                                            <div style={{ fontSize: '9px', color: '#10b981' }}>AVAILABLE</div>
                                        </div>
                                    </div>

                                    <div className="col-lg-2 col-md-3 col-6">
                                        <div className="rounded p-3 text-center" style={{ backgroundColor: '#0a0b10', border: '1px solid #1f2235' }}>
                                            <i className="fa-solid fa-bed mb-2 text-secondary"></i>
                                            <div style={{ fontSize: '11px' }}>B-116</div>
                                            <div style={{ fontSize: '9px', color: '#10b981' }}>AVAILABLE</div>
                                        </div>
                                    </div>

                                    <div className="col-lg-2 col-md-3 col-6">
                                        <div className="rounded p-3 text-center" style={{ backgroundColor: '#0a0b10', border: '1px solid #1f2235' }}>
                                            <i className="fa-solid fa-bed mb-2 text-secondary"></i>
                                            <div style={{ fontSize: '11px' }}>B-117</div>
                                            <div style={{ fontSize: '9px', color: '#10b981' }}>AVAILABLE</div>
                                        </div>
                                    </div>

                                    <div className="col-lg-2 col-md-3 col-6">
                                        <div className="rounded p-3 text-center" style={{ backgroundColor: '#0a0b10', border: '1px solid #1f2235' }}>
                                            <i className="fa-solid fa-bed mb-2 text-secondary"></i>
                                            <div style={{ fontSize: '11px' }}>B-118</div>
                                            <div style={{ fontSize: '9px', color: '#10b981' }}>AVAILABLE</div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>

                  
                    <div className="col-12 col-xl-4">
                        <div className="card border-0 p-4" style={{ backgroundColor: '#11131f', borderRadius: '16px' }}>
                            <h5 className="mb-4 d-flex align-items-center gap-2">
                                <i class="fa-solid fa-user-group"></i> Patient Queue
                            </h5>

                           
                            <div className="row g-3">

                                
                                <div className="col-12">
                                    <div className="p-3 rounded-3" style={{ backgroundColor: '#06080c', border: '1px solid #1f2235' }}>
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <div>
                                                <div className="fw-bold small">Robert Martinez</div>
                                                <div className="text-secondary" style={{ fontSize: '10px' }}>P-1024 • Age 45</div>
                                            </div>
                                            <span className="badge bg-danger-subtle text-warning" style={{ fontSize: '9px' }}><i class="fa-regular fa-clock text-warning"></i> 15 min</span>
                                        </div>
                                        <div className='d-flex justify-content-between mt-3'>
                                            <div className="d-flex  text-secondary" style={{ fontSize: '10px' }}>
                                                Emergency
                                            </div>
                                            <p className="d-flex align-items-center text-secondary" style={{ fontSize: '10px' }}>Chest pain</p>
                                        </div>
                                    </div>
                                </div>

                               
                                <div className="col-12">
                                    <div className="p-3 rounded-3" style={{ backgroundColor: '#06080c', border: '1px solid #1f2235' }}>
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <div>
                                                <div className="fw-bold small">Emily Chen</div>
                                                <div className="text-secondary" style={{ fontSize: '10px' }}>P-1025 • Age 22</div>
                                            </div>
                                            <span className="badge bg-danger-subtle text-warning" style={{ fontSize: '9px' }}><i class="fa-regular fa-clock text-warning"></i> 28 min</span>
                                        </div>
                                        <div className='d-flex justify-content-between mt-3'>
                                            <div className="d-flex  text-secondary" style={{ fontSize: '10px' }}>
                                                General
                                            </div>
                                            <p className="d-flex align-items-center text-secondary" style={{ fontSize: '10px' }}>Fever</p>
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="col-12">
                                    <div className="p-3 rounded-3" style={{ backgroundColor: '#06080c', border: '1px solid #1f2235' }}>
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <div>
                                                <div className="fw-bold small">David Wilson</div>
                                                <div className="text-secondary" style={{ fontSize: '10px' }}>P-1026 • Age 58</div>
                                            </div>
                                            <span className="badge bg-danger-subtle text-warning" style={{ fontSize: '9px' }}><i class="fa-regular fa-clock text-warning"></i> 8 min</span>
                                        </div>
                                        <div className='d-flex justify-content-between mt-3'>
                                            <div className="d-flex  text-secondary" style={{ fontSize: '10px' }}>
                                                Cardiology
                                            </div>
                                            <p className="d-flex align-items-center text-secondary" style={{ fontSize: '10px' }}>Follow up</p>
                                        </div>
                                    </div>
                                </div>

                              
                                <div className="col-12">
                                    <button className="btn btn-dark w-100 py-2 border-secondary text-light fw-bold mt-2" style={{ fontSize: '12px' }}>
                                        View Full Queue
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};



const SidebarLink = ({ icon, label, active }) => (
    <div className={`d-flex align-items-center p-3 rounded-3 mb-1 ${active ? 'bg-primary text-white' : 'text-secondary'}`} style={{ cursor: 'pointer' }}>
        <span className="me-3">{icon}</span>
        <span className="fw-medium small">{label}</span>
    </div>
);


export default Dashboard;