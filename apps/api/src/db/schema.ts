import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";


export const user = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 200 }).notNull(),
    username: varchar({ length: 200 }).notNull().unique(),
    email: varchar({ length: 200 }).notNull().unique(),
});
export const group = pgTable("groups", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 200 }).notNull(),
    creatorId: integer("creator").notNull().references(() => user.id, { onDelete: "cascade" })
});
export const userToGroup = pgTable("user_to_groups", {
    userId: integer().notNull().references(() => user.id),
    groupId: integer().notNull().references(() => group.id)
}, (t) => [primaryKey({ columns: [t.groupId, t.userId] })]);

// Relations
export const userRelations = relations(user, ({ many }) => ({
    groups: many(userToGroup),
    createdGroups: many(group)
}))
export const groupRelations = relations(group, ({ one, many }) => ({
    creator: one(user, {
        fields: [group.creatorId],
        references: [user.id]
    }),
    user: many(userToGroup),
}))
export const userToGroupRelations = relations(userToGroup, ({ one }) => ({
    group: one(group, {
        fields: [userToGroup.groupId],
        references: [group.id]
    }),
    user: one(user, {
        fields: [userToGroup.userId],
        references: [user.id]
    }),
}))

// Schema
export const userGetSchema = createSelectSchema(user)
export type UserGetSchema = z.infer<typeof userGetSchema>
export const userCreateSchema = createInsertSchema(user);
export type UserCreateSchema = z.infer<typeof userCreateSchema>
export const userUpdateSchema = createUpdateSchema(user)
export type UserUpdateSchema = z.infer<typeof userUpdateSchema>

export const groupGetSchema = createSelectSchema(group)
export type GroupGetSchema = z.infer<typeof groupGetSchema>
export const groupCreateSchema = createInsertSchema(group)
export type GroupCreateSchema = z.infer<typeof groupCreateSchema>
export const groupUpdateSchema = createUpdateSchema(group)
export type GroupUpdateSchema = z.infer<typeof groupUpdateSchema>

export const userToGroupGetSchema = createSelectSchema(userToGroup)
export type UserToGroupGetSchema = z.infer<typeof userToGroupGetSchema>
export const userToGroupCreateSchema = createInsertSchema(userToGroup)
export type UserToGroupCreateSchema = z.infer<typeof userToGroupCreateSchema>
export const userToGroupUpdateSchema = createUpdateSchema(userToGroup)
export type UserToGroupUpdateSchema = z.infer<typeof userToGroupUpdateSchema>
