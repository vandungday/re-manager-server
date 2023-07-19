-- CreateTable
CREATE TABLE `process_of_candidates` (
    `process_id` INTEGER NOT NULL,
    `candidate_id` INTEGER NOT NULL,
    `user_id` INTEGER NULL,
    `note` TEXT NULL,
    `exam` VARCHAR(255) NULL,
    `score` FLOAT NULL,

    PRIMARY KEY (`process_id`, `candidate_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `process_of_candidates` ADD CONSTRAINT `process_of_candidates_process_id_fkey` FOREIGN KEY (`process_id`) REFERENCES `processes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `process_of_candidates` ADD CONSTRAINT `process_of_candidates_candidate_id_fkey` FOREIGN KEY (`candidate_id`) REFERENCES `candidates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `process_of_candidates` ADD CONSTRAINT `process_of_candidates_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
