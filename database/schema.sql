-- ============================================================
-- Temple Management System — Full Database Schema
-- Database: templemanagementsystem
--
-- Import in phpMyAdmin:
--   1. Select database "templemanagementsystem" (or create it)
--   2. Click Import → Choose this file → Go
--   3. Then run: http://localhost/templemanagementsystem/seed.php?force=1
--
-- Or run install.php (creates DB + tables + demo data automatically):
--   http://localhost/templemanagementsystem/install.php
-- ============================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';

CREATE DATABASE IF NOT EXISTS `templemanagementsystem`
    CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `templemanagementsystem`;

-- ------------------------------------------------------------
-- Core
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `full_name` VARCHAR(150) NOT NULL,
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(20) DEFAULT NULL,
    `role` VARCHAR(50) NOT NULL,
    `status` ENUM('active','inactive') DEFAULT 'active',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `temple_settings` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `setting_key` VARCHAR(100) NOT NULL UNIQUE,
    `setting_value` TEXT,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `activity_log` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `user_role` VARCHAR(50) NOT NULL,
    `action` ENUM('create','update','delete','approve','reject','cancel','check_in','register') NOT NULL DEFAULT 'create',
    `entity_type` VARCHAR(50) NOT NULL,
    `entity_id` INT DEFAULT NULL,
    `summary` VARCHAR(500) NOT NULL,
    `link` VARCHAR(300) DEFAULT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_entity` (`entity_type`, `entity_id`),
    INDEX `idx_created` (`created_at`),
    CONSTRAINT `fk_activity_log_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `notifications` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `message` VARCHAR(500) NOT NULL,
    `link` VARCHAR(300) DEFAULT NULL,
    `read_at` TIMESTAMP NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_notifications_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Communications & records
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `announcements` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(200) NOT NULL,
    `content` TEXT NOT NULL,
    `created_by` INT NOT NULL,
    `is_public` TINYINT(1) DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_announcements_user` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `temple_records` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(200) NOT NULL,
    `content` TEXT NOT NULL,
    `record_type` VARCHAR(100) DEFAULT 'general',
    `created_by` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_temple_records_user` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `correspondence` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `subject` VARCHAR(200) NOT NULL,
    `content` TEXT NOT NULL,
    `from_user` INT NOT NULL,
    `to_role` VARCHAR(50) NOT NULL,
    `is_read` TINYINT(1) DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_correspondence_user` FOREIGN KEY (`from_user`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `approvals` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `entity_type` VARCHAR(50) NOT NULL,
    `entity_id` INT NOT NULL,
    `requested_by` INT NOT NULL,
    `approved_by` INT DEFAULT NULL,
    `status` ENUM('pending','approved','rejected') DEFAULT 'pending',
    `notes` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Religious / rituals
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `ritual_requests` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `devotee_id` INT NOT NULL,
    `ritual_type` VARCHAR(100) NOT NULL,
    `requested_date` DATE NOT NULL,
    `notes` TEXT,
    `status` ENUM('pending','scheduled','approved','completed','rejected') DEFAULT 'pending',
    `coordinator_id` INT DEFAULT NULL,
    `priest_id` INT DEFAULT NULL,
    `head_priest_approved` TINYINT(1) DEFAULT 0,
    `scheduled_date` DATE DEFAULT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_ritual_requests_devotee` FOREIGN KEY (`devotee_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `worship_schedules` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `priest_id` INT NOT NULL,
    `service_type` VARCHAR(100) NOT NULL,
    `schedule_date` DATE NOT NULL,
    `schedule_time` TIME NOT NULL,
    `status` ENUM('scheduled','completed','cancelled') DEFAULT 'scheduled',
    `notes` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_worship_schedules_priest` FOREIGN KEY (`priest_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `worship_records` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `priest_id` INT NOT NULL,
    `service_type` VARCHAR(100) NOT NULL,
    `service_date` DATE NOT NULL,
    `attendees` INT DEFAULT 0,
    `notes` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_worship_records_priest` FOREIGN KEY (`priest_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Finance & donations
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `donations` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `donor_id` INT NOT NULL,
    `amount` DECIMAL(12,2) NOT NULL,
    `donation_type` VARCHAR(50) DEFAULT 'general',
    `purpose` VARCHAR(200) DEFAULT NULL,
    `payment_method` VARCHAR(50) DEFAULT 'cash',
    `received_by` INT DEFAULT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_donations_donor` FOREIGN KEY (`donor_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `financial_transactions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `transaction_type` ENUM('income','expense') NOT NULL,
    `amount` DECIMAL(12,2) NOT NULL,
    `description` TEXT NOT NULL,
    `category` VARCHAR(100) DEFAULT NULL,
    `recorded_by` INT NOT NULL,
    `status` ENUM('pending','approved','rejected') DEFAULT 'pending',
    `approved_by` INT DEFAULT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_financial_transactions_user` FOREIGN KEY (`recorded_by`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `budgets` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `category` VARCHAR(100) NOT NULL,
    `amount` DECIMAL(12,2) NOT NULL,
    `period` VARCHAR(50) NOT NULL,
    `created_by` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_budgets_user` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Events & community
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `events` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(200) NOT NULL,
    `description` TEXT,
    `event_date` DATE NOT NULL,
    `event_time` TIME DEFAULT NULL,
    `location` VARCHAR(200) DEFAULT NULL,
    `manager_id` INT NOT NULL,
    `status` ENUM('active','cancelled','completed') DEFAULT 'active',
    `is_festival` TINYINT(1) DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_events_manager` FOREIGN KEY (`manager_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `event_registrations` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `event_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `registered_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY `unique_reg` (`event_id`, `user_id`),
    CONSTRAINT `fk_event_registrations_event` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_event_registrations_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `volunteer_tasks` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(200) NOT NULL,
    `description` TEXT,
    `coordinator_id` INT NOT NULL,
    `volunteer_id` INT DEFAULT NULL,
    `event_id` INT DEFAULT NULL,
    `status` ENUM('pending','assigned','in_progress','completed') DEFAULT 'pending',
    `due_date` DATE DEFAULT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_volunteer_tasks_coordinator` FOREIGN KEY (`coordinator_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `member_requests` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `member_id` INT NOT NULL,
    `request_type` VARCHAR(100) NOT NULL,
    `description` TEXT NOT NULL,
    `status` ENUM('pending','approved','rejected') DEFAULT 'pending',
    `reviewed_by` INT DEFAULT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_member_requests_member` FOREIGN KEY (`member_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `visit_registrations` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `visitor_id` INT NOT NULL,
    `visit_date` DATE NOT NULL,
    `visit_time` TIME DEFAULT NULL,
    `purpose` VARCHAR(200) DEFAULT NULL,
    `status` ENUM('pending','approved','completed') DEFAULT 'pending',
    `checked_in` TINYINT(1) DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_visit_registrations_visitor` FOREIGN KEY (`visitor_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Education
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `education_classes` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(200) NOT NULL,
    `description` TEXT,
    `coordinator_id` INT NOT NULL,
    `teacher_id` INT DEFAULT NULL,
    `schedule_day` VARCHAR(20) DEFAULT NULL,
    `schedule_time` TIME DEFAULT NULL,
    `status` ENUM('active','inactive') DEFAULT 'active',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_education_classes_coordinator` FOREIGN KEY (`coordinator_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `class_attendance` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `class_id` INT NOT NULL,
    `student_id` INT NOT NULL,
    `attendance_date` DATE NOT NULL,
    `present` TINYINT(1) DEFAULT 1,
    `recorded_by` INT NOT NULL,
    CONSTRAINT `fk_class_attendance_class` FOREIGN KEY (`class_id`) REFERENCES `education_classes` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_class_attendance_student` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `student_progress` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `class_id` INT NOT NULL,
    `student_id` INT NOT NULL,
    `assessment` VARCHAR(200) NOT NULL,
    `grade` VARCHAR(20) NOT NULL,
    `teacher_id` INT NOT NULL,
    `notes` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_student_progress_class` FOREIGN KEY (`class_id`) REFERENCES `education_classes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Operations
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `inventory_items` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(150) NOT NULL,
    `category` VARCHAR(100) DEFAULT NULL,
    `quantity` INT DEFAULT 0,
    `min_stock` INT DEFAULT 5,
    `unit` VARCHAR(30) DEFAULT 'pcs',
    `manager_id` INT DEFAULT NULL,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `inventory_usage` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `item_id` INT NOT NULL,
    `quantity_used` INT NOT NULL,
    `used_by` INT NOT NULL,
    `purpose` VARCHAR(200) DEFAULT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_inventory_usage_item` FOREIGN KEY (`item_id`) REFERENCES `inventory_items` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `maintenance_records` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(200) NOT NULL,
    `description` TEXT NOT NULL,
    `location` VARCHAR(150) DEFAULT NULL,
    `status` ENUM('open','in_progress','completed') DEFAULT 'open',
    `priority` ENUM('low','medium','high') DEFAULT 'medium',
    `reported_by` INT NOT NULL,
    `assigned_to` INT DEFAULT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `completed_at` TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `security_incidents` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `description` TEXT NOT NULL,
    `location` VARCHAR(150) DEFAULT NULL,
    `severity` ENUM('low','medium','high') DEFAULT 'medium',
    `reported_by` INT NOT NULL,
    `status` ENUM('open','resolved') DEFAULT 'open',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Default temple settings
-- ------------------------------------------------------------

INSERT IGNORE INTO `temple_settings` (`setting_key`, `setting_value`) VALUES
    ('temple_name', 'Shree Temple Management System'),
    ('temple_address', '123 Sacred Street, Devotion City'),
    ('opening_hours', '5:00 AM - 9:00 PM'),
    ('contact_email', 'info@gmail.com'),
    ('contact_phone', '+91 9876543210');

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
-- 25 tables created:
--   users, temple_settings, activity_log, notifications,
--   announcements, temple_records, correspondence, approvals,
--   ritual_requests, worship_schedules, worship_records,
--   donations, financial_transactions, budgets,
--   events, event_registrations, volunteer_tasks, member_requests,
--   visit_registrations, education_classes, class_attendance,
--   student_progress, inventory_items, inventory_usage,
--   maintenance_records, security_incidents
--
-- Next step — load demo data (20 roles, sample records):
--   http://localhost/templemanagementsystem/seed.php?force=1
-- ============================================================
