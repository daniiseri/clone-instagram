import { FastifyInstance } from "fastify";
import { userRoutes } from "./user-routes";
import { uploadRoutes } from "./upload-routes";
import { followRoutes } from "./follow-routes";
import { profileRoutes } from "./profile-routes";

export async function routes(app: FastifyInstance) {
  app.register(userRoutes)
  app.register(uploadRoutes)
  app.register(followRoutes)
  app.register(profileRoutes)
}