import { Request, Response, NextFunction } from 'express';
import { Payload } from '@/domain/entities/IUser';
import { CustomRequest } from '@/domain/entities/utils';
import { HttpStatus } from '@/shared/HttpStatusCode';



export function authorizeRole(requiredRole: string[]) {
    return (req: CustomRequest, res: Response, next: NextFunction): void => {
        const user = req.user as Payload;
        if (!user) {
            res.status(HttpStatus.Forbidden).json({ message: 'No user data found' });
            return 
        }

        console.log(requiredRole,user?.role)
        if (!(requiredRole).includes(user.role)) {
            res.status(HttpStatus.Forbidden).json({ message: 'Access denied: insufficient role' });
            return 
        }

        next(); 
    };
}
