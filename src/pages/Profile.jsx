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
        <div className="flex-6 p-10 space-y-6 lg:py-10 lg:px-30">
            <h2 className="text-4xl font-bold lg:text-5xl">My Profile</h2>
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
