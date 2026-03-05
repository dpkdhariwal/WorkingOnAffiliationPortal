CREATE TABLE newage_app_common_civil_infra_documents (
    slno INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Primary key - Auto increment serial number',
    category ENUM("CIVIL") DEFAULT NULL,
    particular ENUM(
        'MULTIPURPOSE_HALL',
        'IT_LAB',
        'LIBRARY',
        'PLACEMENT_AND_COUNSELLING_ROOM',
        'PRINCIPAL_ROOM',
        'FIRST_AID_ROOM'
    ) DEFAULT NULL,
    document VARCHAR(255) DEFAULT NULL,
    availability ENUM("yes", "no") DEFAULT NULL,
    appId VARCHAR(255) DEFAULT NULL
) COMMENT = 'New Age Common Civil Infrastructure Documents';