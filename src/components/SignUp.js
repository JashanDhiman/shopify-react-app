import React from "react";

import { storeFront } from "../utils";

const SignUp = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, lname, email, password } = e.target;
  };
  const gql = String.raw;
  const productsQuery = gql`
    query Products {
      products(first: 10) {
        edges {
          node {
            title
          }
        }
      }
    }
  `;
  const getStaticProps = async () => {
    const { data } = await storeFront(productsQuery);
    //var config = {
    //  method: "post",
    //  url: "http://localhost:4000/products",
    //  data: productsQuery,
    //};
    //const { data } = await axios(config);
    console.log(data);
    //return data;
  };
  getStaticProps();
  return (
    <>
      <div>Sign-Up</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fname">First Name</label>
          <input type="text" id="fname" required />
        </div>
        <div>
          <label htmlFor="lname">Last Name</label>
          <input type="text" id="lname" required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required />
        </div>
        <input type="submit" />
      </form>
    </>
  );
};
export default SignUp;
