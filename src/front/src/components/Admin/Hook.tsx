import { useState } from 'react';
import { ProfileToAdmin, AdminService } from '../../services/Admin';
// import UserHelper from '../../helpers/UserHelper';
import { PageParams } from '../../services/CommonTypes';


export default function useProfileToAdmin() {
    const [profiles, setProfiles] = useState<ProfileToAdmin[]>([])
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [error, setError] = useState<Error | undefined>(undefined);

    const adminService = new AdminService();


    async function _removeOne(id : number): Promise<Boolean> {
        try {
            await adminService.removeAnybody(id);
            setError(undefined);
            return true;
        }
        catch (err) {
            setError(err);
            return false;
        }
    }
    async function _getAll(params: PageParams): Promise<void> {
        try {
            const results = await adminService.getAllUsers(params);

            setProfiles(results.content);
            setTotal(results.totalElements);
            setCurrentPage(results.pageable.pageNumber);
        }
        catch (err) {
            setProfiles([]);
            setError(err.undefined);
        }
    }

    return {
        removeAnybody: (id: number) => _removeOne(id),
        getAllUsers: (page: number, size: number) => _getAll({ page, size }),
        profiles,
        total,
        currentPage,
        error
    }
    }

