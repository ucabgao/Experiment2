exports.names = ['.stats', '.bestdjs', '.bestplays', '.busydjs', '.mostgrabbed', '.mostmehed', '.mostplayed', '.mostwooted', '.mymostgrabbed', '.mymostmehed', '.mymostplayed', '.mymostwooted', '.mystats', '.worstdjs'];
exports.hidden = false;
exports.enabled = true;
exports.matchStart = false;
exports.handler = function (data) {
    bot.sendChat('Individual and room stats are being moved to our new website and are available via API.  Stay tuned for details!');

    //db.get('SELECT COUNT(*) AS total_songs, COUNT(DISTINCT userid) AS total_djs, COUNT(DISTINCT songid) AS unique_songs, SUM(upvotes) AS upvotes, SUM(snags) AS snags, SUM(downvotes) AS downvotes, AVG(upvotes) as avg_upvotes, AVG(snags) AS avg_snags, AVG(downvotes) as avg_downvotes FROM PLAYS', function (err, row) {
    //    bot.sendChat(row['total_songs'] + ' songs ('
    //    + row['unique_songs'] + ' unique) have been played by '
    //    + row['total_djs'] + ' DJs with a total of '
    //    + row['upvotes'] + ' woots, '
    //    + row['snags'] + ' grabs and '
    //    + row['downvotes'] + ' mehs (avg +'
    //    + new Number(row['avg_upvotes']).toFixed(1) + '/'
    //    + new Number(row['avg_snags']).toFixed(1) + '/-'
    //    + new Number(row['avg_downvotes']).toFixed(1) + ')');
    //});
};
