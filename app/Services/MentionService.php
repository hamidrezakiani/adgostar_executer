<?php
namespace App\Services;

use App\Models\Hashtag;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class MentionService{

    public function getMentions($text) : array
    {
        $pattern = "/(@\w+)/u";
        $mentions = array();
        preg_match_all($pattern, $text, $matches);
        if ($matches) {
            $mentionsArray = array_count_values($matches[0]);
            $mentions = array_keys($mentionsArray);
            foreach($mentions as $key => $value)
            {
                $mentions[$key] = substr($value,1);
            }
        }
        return $mentions;
    }

    public function validMentions($text) : array
    {
        $mentions = array();
        foreach($this->getMentions($text) as $mention)
        {
           if($user = $this->findOrFail($mention))
             array_push($mentions,$user);
        }
        return $mentions;
    }

    public function findOrFail($username) : Model
    {
        if($user = User::where('username',$username)->select(['id','username'])->first())
        {
            return $user;
        }
        else
        {
           return false;
        }

    }

    public static function softDetach($tweet_id)
    {
      return DB::table('hashtag_tweet')->where('tweet_id',$tweet_id)
                 ->update(['deleted_at' => DB::raw('NOW()')]);
    }
}
