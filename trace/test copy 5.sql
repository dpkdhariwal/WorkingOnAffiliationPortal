CREATE TABLE `newage_tradeswise_geotagged_documents` (
	`slno` INT NOT NULL AUTO_INCREMENT,
	`appId` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`tradeId` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`document` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
    `category` ENUM("Installed_Machinery", "Tools_Equipment") NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`slno`) USING BTREE
)
COMMENT='Geo-tagged Photo of Trade-wise Installed Machinery /n Geo-tagged Photo of Trade-wise Tools & Equipment'
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=1
;

CREATE TABLE `newage_undertaking_form` (
	`slno` INT NOT NULL AUTO_INCREMENT,
	`appId` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`document` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`slno`) USING BTREE
)
COMMENT='Details of Machinery, Tools & Equipment /n Undertaking Form'
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=1
;
