import Role from '../models/role.model.js';

export const seedRoles = async () => {
    try {
        const roles = [
            {
                name: 'user',
                description: 'Regular banking customer',
                permissions: [
                    'profile.read',
                    'profile.update',
                    'account.read',
                    'transaction.create',
                    'transaction.read'
                ]
            },
            {
                name: 'admin',
                description: 'System administrator',
                permissions: [
                    'users.read',
                    'users.create',
                    'users.update',
                    'users.delete',
                    'accounts.read',
                    'accounts.update',
                    'transactions.read',
                    'transactions.update',
                    'roles.manage'
                ]
            }

            // {
            //     name: 'manager',
            //     description: 'Bank branch manager',
            //     permissions: [
            //         'users.read',
            //         'accounts.read',
            //         'transactions.read'
            //     ]
            // },

            // {
            //     name: 'superadmin',
            //     description: 'System super administrator',
            //     permissions: [
            //         '*'
            //     ]
            // }
        ];

        let createdCount = 0;

        for (const role of roles) {
            const existingRole = await Role.findOne({
                name: role.name
            });

            if (!existingRole) {
                await Role.create(role);
                createdCount++;
            }
        }

        if (createdCount > 0) {
            console.log(`${createdCount} role(s) seeded successfully.`);
        } else {
            console.log('Roles are already up to date.');
        }

    } catch (error) {
        console.error('Role Seeder Error:', error.message);
    }
};