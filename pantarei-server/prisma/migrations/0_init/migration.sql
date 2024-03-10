-- CreateTable
CREATE TABLE `categories` (
    `id` VARCHAR(100) NOT NULL DEFAULT (uuid()),
    `name` VARCHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_details` (
    `id` VARCHAR(100) NOT NULL DEFAULT (uuid()),
    `order_id` VARCHAR(100) NOT NULL,
    `skill_offered_id` VARCHAR(100) NOT NULL,
    `skill_requested_id` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `order_id`(`order_id`),
    INDEX `skill_offered_id`(`skill_offered_id`),
    INDEX `skill_requested_id`(`skill_requested_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `id` VARCHAR(100) NOT NULL DEFAULT (uuid()),
    `status` VARCHAR(20) NOT NULL DEFAULT ('in progress'),
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `name` VARCHAR(20) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `skill_categories` (
    `skill_id` VARCHAR(100) NOT NULL,
    `category_id` VARCHAR(100) NOT NULL,

    INDEX `category_id`(`category_id`),
    PRIMARY KEY (`skill_id`, `category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `skills` (
    `id` VARCHAR(100) NOT NULL DEFAULT (uuid()),
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_orders` (
    `user_id` VARCHAR(100) NOT NULL,
    `order_id` VARCHAR(100) NOT NULL,
    `role` VARCHAR(20) NULL,

    INDEX `order_id`(`order_id`),
    PRIMARY KEY (`user_id`, `order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_skills` (
    `user_id` VARCHAR(100) NOT NULL,
    `skill_id` VARCHAR(100) NOT NULL,
    `user_role` VARCHAR(20) NOT NULL,

    INDEX `skill_id`(`skill_id`),
    PRIMARY KEY (`user_id`, `skill_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(100) NOT NULL DEFAULT (uuid()),
    `name` VARCHAR(30) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `role_id` INTEGER NOT NULL,

    UNIQUE INDEX `email`(`email`),
    INDEX `role_id`(`role_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `order_details` ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_details` ADD CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`skill_offered_id`) REFERENCES `skills`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_details` ADD CONSTRAINT `order_details_ibfk_3` FOREIGN KEY (`skill_requested_id`) REFERENCES `skills`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `skill_categories` ADD CONSTRAINT `skill_categories_ibfk_1` FOREIGN KEY (`skill_id`) REFERENCES `skills`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `skill_categories` ADD CONSTRAINT `skill_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_orders` ADD CONSTRAINT `user_orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_orders` ADD CONSTRAINT `user_orders_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_skills` ADD CONSTRAINT `user_skills_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_skills` ADD CONSTRAINT `user_skills_ibfk_2` FOREIGN KEY (`skill_id`) REFERENCES `skills`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

