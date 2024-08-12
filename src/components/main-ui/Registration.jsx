// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Registration = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [companyName, setCompanyName] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const navigate = useNavigate();

//   const handleRegister = (e) => {
//     e.preventDefault();
//     if (username && email && phone && companyName && password) {
//       // You can handle the registration logic here
//       setSuccess('Registration successful!');
//       navigate('/');
//       setError('');
//       // Clear form fields after successful registration
//       setUsername('');
//       setEmail('');
//       setPhone('');
//       setCompanyName('');
//       setPassword('');
//     } else {
//       setError('Please fill in all fields.');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         {success && <p className="text-green-500 mb-4">{success}</p>}
//         <form onSubmit={handleRegister}>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
//             <input
//               type="text"
//               id="username"
//               className="w-full p-2 border border-gray-300 rounded"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               className="w-full p-2 border border-gray-300 rounded"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2" htmlFor="phone">Phone No</label>
//             <input
//               type="text"
//               id="phone"
//               className="w-full p-2 border border-gray-300 rounded"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2" htmlFor="companyName">Company Name</label>
//             <input
//               type="text"
//               id="companyName"
//               className="w-full p-2 border border-gray-300 rounded"
//               value={companyName}
//               onChange={(e) => setCompanyName(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               className="w-full p-2 border border-gray-300 rounded"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-[#1572c2] text-white p-2 rounded "
//           >
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Registration;
