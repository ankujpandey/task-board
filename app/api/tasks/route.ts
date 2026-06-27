import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createTaskSchema } from "@/lib/validations";
import { getUserIdFromRequest } from "@/lib/auth";
import { UnauthorizedError } from "@/lib/errors";

export async function POST(req: NextRequest) {
  try {

    const result = createTaskSchema.safeParse(await req.json());

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: result.error.issues,
        },
        {
          status: 400,
        }
      );
    }

    const { title, status } = result.data;

    const userId = await getUserIdFromRequest();

    const task = await prisma.task.create({
      data: {
        title,
        status,
        userId,
      },
    });

    return NextResponse.json(
      {
        message: "Task created successfully",
        task,
      },
      {
        status: 201,
      }
    );

  } catch (error) {

    if (error instanceof UnauthorizedError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 401,
        }
      );
    }

    console.error(error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(req: NextRequest) {    
    try {
        const userId = await getUserIdFromRequest();
    
        const tasks = await prisma.task.findMany({
            where: {
                userId,
            },
            orderBy:{
                createdAt:"desc"
            }
        });
    
        return NextResponse.json(
            {
                message: "Tasks fetched successfully",
                tasks,
            },
            {
                status: 200,
            }
        );
    }   catch (error) {     
        if (error instanceof UnauthorizedError) {
            return NextResponse.json(
                {
                    message: error.message,
                },
                {
                    status: 401,
                }
            );
        }

        return NextResponse.json(
            {
                message: "Internal Server Error",
            },
            {
                status: 500,
            }
        );
    }
}
