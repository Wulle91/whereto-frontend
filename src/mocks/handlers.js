import { rest } from "msw"

const baseURL = "https://whereto-backend-2f21048c299f.herokuapp.com";

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({pk:7,username:"dora",email:"",first_name:"",last_name:"",profile_id:7,profile_image:"https://res.cloudinary.com/dzwpkjbhq/image/upload/v1/media/../default_profile_jbyuxy"})
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
