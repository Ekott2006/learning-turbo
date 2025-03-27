import {and, eq} from "drizzle-orm"
import db from "../db"
import {userToGroup, type UserToGroupCreateSchema} from "../db/schema"
import {deleteGroup} from "./group.services"

export async function createUserToGroup(data: UserToGroupCreateSchema) {
    await db.insert(userToGroup).values(data)
}
export async function deleteUserToGroup({ groupId, userId }: UserToGroupCreateSchema) {
    await deleteGroup(groupId, userId)
    await db.delete(userToGroup).where(and(eq(userToGroup.groupId, groupId), eq(userToGroup.userId, userId)))
}