import { useState } from 'react';
import { setConstantValue } from 'typescript';
import { PageParams } from '../../services/Event';
import { ProfileService, ProfileToAdmin } from '../../services/Profile';

export function useUsers() {
    const [profiles, setProfiles] = useState<ProfileToAdmin[]>([])
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [error, setError] = useState<string | undefined>("Erreur de serveur");

    const profileService = new ProfileService();

    async function _getAll(params: PageParams): Promise<void> {
        try {
            const results = await profileService.getAllUsers(params);

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
        getAllUsers: (page: number, size: number) => _getAll({ page, size }),
        profiles,
        total,
        currentPage,
        error
    }
}




