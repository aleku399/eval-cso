import nextRoutes from "@yolkai/next-routes";

const routes = nextRoutes();

routes.add('agent')
routes.add('claim-data', '/claim/data')
routes.add('claim-summary', '/claim/summary')
routes.add('claim-types', '/claim/types')
routes.add('claim')
routes.add('data')
routes.add('login')
routes.add('service')
routes.add('signup')
routes.add('summary')
routes.add('user', '/user/:userName')
routes.add('users')

export const Router = routes.Router;
export const Link = routes.Link
export default routes;
