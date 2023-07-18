-- CreateTable
CREATE TABLE `candidates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `job_id` INTEGER NOT NULL,
    `full_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `link_cv` VARCHAR(255) NOT NULL,
    `source` ENUM('WEB_FORM', 'TOP_CV', 'IT_VIEC', 'FACEBOOK', 'LINKEDIN', 'OTHER') NOT NULL,
    `year_of_experience` FLOAT NULL,
    `address` VARCHAR(255) NULL,
    `preferred_offer` FLOAT NULL,
    `referrer` VARCHAR(255) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `candidates` ADD CONSTRAINT `candidates_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `jobs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
