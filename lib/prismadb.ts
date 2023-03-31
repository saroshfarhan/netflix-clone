//This is a boilerplate code to initailize prisma for prod as well as development

import { PrismaClient } from "@prisma/client";

const client = global.prismadb||new PrismaClient();
if(process.env.NODE_ENV === "production") global.prismadb = client;

export default client