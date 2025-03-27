import {eq} from "drizzle-orm";
import db from "../db";
import {user, type UserCreateSchema, type UserGetSchema, type UserUpdateSchema} from "../db/schema";

export async function getUsers(): Promise<UserGetSchema[]> {
    return db.select().from(user)

}
export async function getUser(id: number): Promise<UserGetSchema | undefined> {
    return await db.query.user.findFirst({
        where: eq(user.id, id), with: {
            createdGroups: true, groups: {
                with: {
                    user: true,
                    group: true
                }
            }
        }
    })
}

export async function createUser(data: UserCreateSchema) {
    const [result] = await db.insert(user).values(data).returning()
    return result
}

export async function updateUser(id: number, data: UserUpdateSchema) {
    const [result] = await db.update(user).set(data).where(eq(user.id, id)).returning()
    return result
}

export async function deleteUser(id: number) {
    return db.delete(user).where(eq(user.id, id))
}