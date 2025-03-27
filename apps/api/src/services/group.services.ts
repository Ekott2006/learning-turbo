import {and, eq} from "drizzle-orm";
import db from "../db";
import {group, type GroupCreateSchema, type GroupGetSchema, type GroupUpdateSchema} from "../db/schema";
import {createUserToGroup} from "./userToGroup.services";

export async function getGroups(): Promise<GroupGetSchema[]> {
    const results = await db.select().from(group);
    console.log(results)
    return results
}

export async function getGroup(id: number) {
    return await db.query.group.findFirst({
        where: eq(group.id, id),
        with: {
            creator: true, user: {
                with: {
                    user: true,
                    group: true
                }
            }
        },
        columns: {
            creatorId: false,
        }
    })
}

export async function createGroup(data: GroupCreateSchema) {
    const [newGroup] = await db.insert(group).values(data).returning()
    await createUserToGroup({groupId: newGroup.id, userId: data.creatorId})
    return newGroup
}

export async function updateGroup(id: number, userId: number, data: GroupUpdateSchema) {
    const [result] = await db.update(group).set(data).where(and(eq(group.id, id), eq(group.creatorId, userId))).returning()
    return result
}

export async function deleteGroup(id: number, userId: number) {
    return db.delete(group).where(and(eq(group.id, id), eq(group.creatorId, userId)))
}