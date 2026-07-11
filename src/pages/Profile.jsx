import { useEffect } from "react";
import { useAuth } from "../context/AuthContext"
import ProfileContainer from "../components/ProfileContainer"
import useProfile from "../features/profiles/useProfile";
import Spinner from "../components/Spinner";

function Profile() {
    const {user} = useAuth();
    const userId = user?.id;
    const {profile, loading, error, fetchProfile} = useProfile();

    useEffect(()=>{
        if(!userId) return;
        fetchProfile(userId);
    }, [userId])


            
    return (
        <div className="py-10 px-2 space-y-6 lg:py-3.5 lg:px-10">
            <h2 className="text-2xl font-bold">My Profile</h2>
            { loading ? (
                <Spinner />
            ) : error ? (
                <p className="text-red-500">Error loading profile: {error}</p>
            ) : (
                <ProfileContainer profile={profile} refetchProfile={() => fetchProfile(userId)} />
            )
            }
        </div>
    )
}

export default Profile
